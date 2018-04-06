import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { VideoService } from './video.service';

@Injectable()

export class ResultfilterService {

  //Service injecten
  constructor(private vs: VideoService) { }

  //modeFilter als BS, das abboniert werden kann
  modeFilterBehaviorSubject = new BehaviorSubject("all");

  //Suchfeld-Wert als BS, das abboniert werden kann
  searchTermBehaviorSubject = new BehaviorSubject("");

  //Sortierfeld als BS, das abboniert werden kann
  orderFieldBS = new BehaviorSubject("name");

  //umgekehrte Sortierung als BS, das abboniert werden kann
  reverseOrderBS = new BehaviorSubject(false);

  //aktuell ausgewaehlten Mode-Filter liefern
  getModeFilter() {
    return this.modeFilterBehaviorSubject;
  }

  //Filter setzen
  setModeFilter(mode: string) {
    this.modeFilterBehaviorSubject.next(mode);
  }

  //aktuellen Suchbegriff liefern
  getSearchTerm() {
    return this.searchTermBehaviorSubject;
  }

  //Suchterm setzen
  setSearchTerm(serachTerm: string) {
    this.searchTermBehaviorSubject.next(serachTerm);
  }

  //Sortierfeld liefern
  getOrderField() {
    return this.orderFieldBS;
  }

  //Sortierfeld setzen
  setOrderField(field: string) {
    this.orderFieldBS.next(field)
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