import { Component, OnInit } from "@angular/core";
import { VoteHelper } from "../@core/helpers/votes/voteHelper";
import { mergeMap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

import { asObservable } from "../@core/utils/asObservable";
import { Votes } from "../@core/models/votes";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html",
  styleUrls: ["./vote.component.scss"]
})
export class VoteComponent implements OnInit {
  private _votes: BehaviorSubject<Votes[]> = new BehaviorSubject<Votes[]>([]);

  //votes: any;
  up: boolean;
  down: boolean;
  constructor(private voteHelper: VoteHelper) {
    this.up = true;
    this.down = false;
  }

  get votes() {
    return asObservable(this._votes);
  }

  ngOnInit() {
    this.loadVotes();
  }

  loadVotes() {
    this.voteHelper.getVotes("").subscribe(res => {
      if (res) {
        console.info(res);
        this._votes.next(res.data.votes);
      }
    });
  }

  preVote(vote: any, thumbsup: boolean) {
    this._votes
      .pipe(
        map(obj => {
          obj.map(item => (item.preSelected = false));
          return obj;
        })
      )
      .subscribe(res => {
        this._votes.next(res);
      });

    console.info(thumbsup);
    vote.preSelected = true;
    vote.preSelectedUp = thumbsup;
  }

   addVote(vote) {
    if (vote.preSelectedUp) {
      vote.thumbsup += 1;
    } else {
      vote.thumbsdown += 1;
    }
    const updateVote = {
      thumbsup: vote.thumbsup,
      thumbsdown: vote.thumbsdown,
      trial: vote.trial
    };
    const eventVote = this.voteHelper.voteUpdate(updateVote, vote.id);
    eventVote
      .pipe(
        mergeMap(res => {
          return this.voteHelper.getVotes("");
        })
      )
      .subscribe(res => {
        res.data.votes.map(item => item.id === vote.id?item.alreadyVote = true:item.alreadyVote);
        this._votes.next(res.data.votes);
      });


  }
  adjustSize(percent){
    if (percent == 50){
      return 50;
    }
    return percent <50?percent<=25?30:40:percent>=75?70:60;
  }

  activePreChoice(vote){
    vote.alreadyVote = false;
  }


}
