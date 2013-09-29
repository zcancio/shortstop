#!/usr/bin/env python
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

"""A mixin for validating form submissions in Tornado"""

import re
import logging
import types
import string

class ValidationMixin:
    
    MSG_DEFAULT = u"is not valid"
    MSG_REQUIRED = u"is required"
    MSG_MUST_MATCH = u" doesn't match"
    
    ALPHA = r"^\D+$"
    SLUG = r"^[a-zA-Z0-9\-]+$"
    NUMERIC = r"^\d+$"
    EMAIL = r"^[a-zA-Z0-9._%\-+]+\@[a-zA-Z0-9._%\-]+\.[a-zA-Z]{2,}$"
    USERNAME = r"^[a-z0-9._]{3,}$"
    DATE = r"^(19|20)\d\d[- /.]([1-9]|0[1-9]|1[012])[- /.]([1-9]|0[1-9]|[12][0-9]|3[01])$"
    TIME = r"^(0|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
    COORDINATES = r"^\((\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)\)$"
    ZIPCODE = r"^\d{5}(-\d{4})?$"
    BOOLEAN_NUMERIC = r"^(0|1)$"
    DECIMAL = r"[-+]?([0-9]*\.)?[0-9]+"
    POSITIVE_DECIMAL = r"[+]?([0-9]*\.)?[0-9]+"


    
    def _help(self, arg_name, specified, name, type):
        if specified is not None:
            self.errors[arg_name] = specified
        else:
            self.errors[arg_name] = name + " " + type
    
    def valid(self, arg_name, validator = None, help = None, name = None, required = True, **kwargs):
        """
        Tornado mixin for validating POST arguments
        Alternative to self.get_argument, but validates first
        Returns the argument after validating it
        Any validation errors will be in self.errors as a dict in the form:
            { field_name: help_message }
        
        Parameters:
        @arg_name: name of the argument to check
        @required: validate for filled-in first (default is True)
        @help: help message to display if argument doesn't validate
        @name: argument title, default is replacing _ with " " and capitalizing the arg name.
               this is how the field name appears in generated error messages
        @validator: can be either:
            - not specified
            - a validation function returning True or False
            - a string containing another argument name: the two must match
            - a string containing a regular expression: must match (case-insensitive)
            - a python type (int, float, bool)
        @**kwargs: these keyword arguments are passed along to the validator function specified
        """
        if self.request.headers.get("Content-Type") == "application/json":
            value = self.json_args.get(arg_name)
            value2 = self.json_args.get(validator)
        else:
            value = self.get_argument(arg_name, None)
            if value == "":
                value = None
            value2 = self.get_argument(validator, None)
        

        if not hasattr(self, "errors"):
            self.errors = {}
        if not required and not validator:
            # nothing to validate
            return value
        if arg_name in self.errors:
            return value # already validated
        if not name:
            name = arg_name.replace("_", " ").replace("-", " ")
            name = string.capwords(name, " ")
        # not filled in ?
        if required and (value is None):
            self._help(arg_name, None, name, ValidationMixin.MSG_REQUIRED)
        elif not required and (value is None):
            return value
        # doesn't match custom function ?
        elif type(validator) == types.FunctionType:
            if not validator(value, **kwargs):
                self._help(arg_name, help, name, ValidationMixin.MSG_DEFAULT)
        # doesn't match type ?
        elif type(validator) == type:
            if validator == int:
                try:
                    value = int(value)
                except ValueError:
                    self._help(arg_name, help, name, ValidationMixin.MSG_DEFAULT)
            elif validator == float:
                try:
                    value = float(value)
                except ValueError:
                    self._help(arg_name, help, name, ValidationMixin.MSG_DEFAULT)
            elif validator == bool:
                if value.lower() in [ "1", "true", "yes", "on" ]:
                    value = True
                elif value.lower() in ["0", "false", "no", "off"]:
                    value = False
                else:
                    self._help(arg_name, help, name, ValidationMixin.MSG_DEFAULT)
            elif validator == str:
                pass
               
        # doesn't match another argument ?
        elif value2 is not None:
            if value != value2:
                self._help(arg_name, help, name, ValidationMixin.MSG_MUST_MATCH)
        # doesn't match regex format ?
        elif type(validator) == str:
            if re.match(validator, value, re.IGNORECASE) is None:
                self._help(arg_name, help, name, ValidationMixin.MSG_DEFAULT)
        
        return value
