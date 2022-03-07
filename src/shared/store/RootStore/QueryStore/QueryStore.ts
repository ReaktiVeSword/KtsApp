import { action, makeObservable, observable } from "mobx";
import qs, { ParsedQs } from "qs";
import { Location, NavigateFunction } from "react-router-dom";

type PrivateFields = "_history" | "_location" | "_params";
export default class QueryStore {
  private _params: ParsedQs = {};
  private _location: Location | undefined;
  private _history: NavigateFunction | undefined;

  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _params: observable,
      _history: observable,
      _location: observable,
      setHistory: action,
      setParam: action,
    });
  }

  setHistory(history: NavigateFunction, location: Location): void {
    this._history = history;
    this._location = location;
  }

  setParam(key: string, value: string): void {
    const nextParams = { ...this._params, [key]: value };
    this._params = nextParams;
    const nextSearch = qs.stringify(nextParams);

    this._history!(nextSearch);
  }

  getParam(key: string): undefined | string | string[] | ParsedQs | ParsedQs[] {
    return this._params[key];
  }
}
