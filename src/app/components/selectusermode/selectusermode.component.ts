import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BackendService } from 'app/services/backend.service';

@Component({
    selector: 'selectusermode',
    templateUrl: './selectusermode.component.html',
    styleUrls: ['./selectusermode.component.scss']
})
export class SelectusermodeComponent implements OnInit {

    //Liste der auswaehlbaren Modes
    userModeObjs: any[] = [
        {
            id: "laila",
            label: "Laila"
        },
        {
            id: "luis",
            label: "Luis"
        },
        {
            id: "mh",
            label: "MH"
        }
    ];

    //userMode-Auswahl
    userModeSelect: UntypedFormControl = new UntypedFormControl(this.userModeObjs[0]);

    constructor(private bs: BackendService) { }

    ngOnInit(): void {

        //Abo userMode -> passendes Select setzen aber kein Event triggern
        this.bs.getUserMode().subscribe(userMode => {
            const userModeIndex = this.userModeObjs.findIndex((obj) => {
                return obj.id === userMode;
            });
            this.userModeSelect.setValue(this.userModeObjs[userModeIndex], { emitEvent: false });
        });

        //In WSS neuen userMode setzen
        this.userModeSelect.valueChanges.subscribe(userMode => {
            this.bs.sendMessage({
                type: "set-user-mode",
                value: userMode.id
            });
        });
    }
}