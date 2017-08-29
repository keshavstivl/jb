import { Component } from '@angular/core';

@Component({
    selector: 'page-constant'
})
export class CONSTANT {
    public static message2 =  "Name is required";
    public static home =  "Chairman App";
    public static device =  "Android";
    public static userType =  "CH";
    public static defaultToken =  "12345";

    public static message = {
        "NAME_REQUIRED": "Name is required",
    }
}