import { RequestManager } from "../../managers/requestManager";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
// import { PopUpManager } from '../../managers/popUpManager';

@Injectable({
  providedIn: "root"
})
export class VoteHelper {
  query_params: String;
  constructor(
    private rqManager: RequestManager // private pUpManager: PopUpManager,
  ) {}
  /**
   * getVotes
   * If the response has errors in the votes API it should show a popup message with an error.
   * If the response succeed, it returns the data of the object.
   * @param id object to get in the DB
   * @param param object with the params to get in the DB
   * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
   */
  public getVotes(id?: any, params?: any) {
    this.rqManager.setPath("TRIAL_SERVICE");

    return this.rqManager
      .post("graphql", {
        operationName: null,
        query:
          "{votes{thumbsup, thumbsdown, trial, uppercent, downpercent, amount, id,"+
            "trialinfo {"+
            "Name,"+
            "ImageUrl}}}"
      })
      .pipe(
        map(res => {
          if (res === "error") {
            //this.pUpManager.showErrorAlert('No se pudo consultar los tipos de comprobante');
            return undefined;
          }
          return res;
        })
      );
  }

  /**
   * voteRegister
   * If the response has errors in the votes API it should show a popup message with an error.
   * If the response suceed, it returns the data of the updated object.
   * @param data object to save in the DB
   * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
   */
  public voteRegister(data:any) {
    this.rqManager.setPath("TRIAL_SERVICE");
    const createObject = JSON.stringify(data).replace(
      /\"([^(\")"]+)\":/g,
      "$1:"
    );
    const createQuery = `
          mutation {
            createVote(input: ${createObject}) {
               thumbsup
               thumbsdown
               trial
               id
            }
          }`;
    return this.rqManager
      .post(`graphql/`, {
        operationName: null,
        query: createQuery
      })
      .pipe(
        map(res => {
          if (res["Type"] === "error") {
            //this.pUpManager.showErrorAlert(res['Message']);
            return undefined;
          }
          return res;
        })
      );
  }

  /**
   * voteUpdate
   * If the response has errors in the votes API it should show a popup message with an error.
   * If the response is successs, it returns the data of the updated object.
   * @param data fields to update
   * @returns  <Observable> object updated information. undefined if the proccess has errors.
   */
  public voteUpdate(data:any, id:any) {
    this.rqManager.setPath("TRIAL_SERVICE");
    const updateObject = JSON.stringify(data).replace(
      /\"([^(\")"]+)\":/g,
      "$1:"
    );

    const updateQuery = `
      mutation {
        updateVote(id: "${id}", input: ${updateObject}) {
          thumbsup
          thumbsdown
          trial
          id
        }
      }`;
    return this.rqManager
      .post("graphql/", {
        operationName: null,
        query: updateQuery
      })
      .pipe(
        map(res => {
          if (res["Type"] === "error") {
            // this.pUpManager.showErrorAlert('No se pudo actualizar el tipo de comprobante');
            return undefined;
          }
          return res;
        })
      );
  }
}
