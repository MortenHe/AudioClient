import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { domainModes } from '../../share/domainModes';
import { ViewControlService } from '../../services/view-control.service';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'selectmode',
    templateUrl: './selectmode.component.html',
    styleUrls: ['./selectmode.component.scss']
})
export class SelectmodeComponent implements OnInit {

    //Liste der Modes (kindervideo, jahresvideo)
    modes: any[] = domainModes;

    //mode-Auswahl
    modeSelect: UntypedFormControl = new UntypedFormControl(this.modes[0]);

    //Services injecten
    constructor(private bs: BackendService, private router: Router, private vcs: ViewControlService) { }

    //beim Init
    ngOnInit() {

        //Wenn sich der Modus aendert (z.B. URL annavigiert oder Aenderung per Select), Modus merken
        this.bs.getMode().subscribe(mode => {
            const modeIndex = this.modes.findIndex((obj) => {
                return obj.id === mode;
            });
            this.modeSelect.setValue(this.modes[modeIndex], { emitEvent: false });
        });

        //Bei Aenderung des Select
        this.modeSelect.valueChanges.subscribe(mode => {

            //zu passender URL navigieren
            this.router.navigate(['/search', mode.id]);

            //Auf Suche-View umschalten
            this.vcs.setView('search');
        });
    }
}