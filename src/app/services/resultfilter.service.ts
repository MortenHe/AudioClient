import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ResultfilterService {
  //Service injecten
  constructor() {}

  //modeFilter als BS, das abboniert werden kann
  modeFilterBS = new BehaviorSubject("all");

  //Suchfeld-Wert als BS, das abboniert werden kann
  searchTermBS = new BehaviorSubject("");

  //Mix-Suchfeld-Wert als BS, das abboniert werden kann
  mixSearchTermBS = new BehaviorSubject("");

  //Sortierfeld als BS, das abboniert werden kann
  orderFieldBS = new BehaviorSubject("added");

  //umgekehrte Sortierung als BS, das abboniert werden kann
  reverseOrderBS = new BehaviorSubject(true);

  //aktuell ausgewaehlten Mode-Filter liefern
  getModeFilter() {
    return this.modeFilterBS;
  }

  //Filter setzen
  setModeFilter(mode: string) {
    this.modeFilterBS.next(mode);
  }

  //aktuellen Suchbegriff liefern
  getSearchTerm() {
    return this.searchTermBS;
  }

  //Suchterm setzen
  setSearchTerm(serachTerm: string) {
    this.searchTermBS.next(serachTerm);
  }

  //aktuellen Mix-Suchbegriff liefern
  getMixSearchTerm() {
    return this.mixSearchTermBS;
  }

  //Mix-Suchterm setzen
  setMixSearchTerm(serachTerm: string) {
    this.mixSearchTermBS.next(serachTerm);
  }

  //Sortierfeld liefern
  getOrderField() {
    return this.orderFieldBS;
  }

  //Sortierfeld setzen
  setOrderField(field: string) {
    this.orderFieldBS.next(field);
  }

  //umgekehrte Sortierung liefern
  getReverseOrder() {
    return this.reverseOrderBS;
  }

  //Umgekehrte Sortierung setzen
  setReverseOrder(bool: boolean) {
    this.reverseOrderBS.next(bool);
  }
}
