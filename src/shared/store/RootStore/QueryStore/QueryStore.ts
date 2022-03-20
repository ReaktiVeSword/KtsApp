import { action, makeObservable, observable } from "mobx";
import qs, { ParsedQs } from "qs";
import { Location, NavigateFunction } from "react-router-dom";

type PrivateFields = "_params";
export default class QueryStore {
  private _params: ParsedQs = {};
  private _parsed: ParsedQs | undefined;
  private _navigate: NavigateFunction | undefined;

  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _params: observable,
      setHistory: action,
      setParam: action,
    });
  }

  setHistory(navigate: NavigateFunction, location: Location): void {
    this._navigate = navigate;
  }

  setLocation(search: string): void {
    this._parsed = qs.parse(search, { ignoreQueryPrefix: true });
  }

  getParsed(): ParsedQs | undefined {
    return this._parsed;
  }

  setParam(key: string, value: string): void {
    const nextParams = { ...this._params, [key]: value };
    this._params = nextParams;
    const nextSearch = qs.stringify(nextParams);

    this._navigate!(nextSearch);
  }

  getParam(key: string): undefined | string | string[] | ParsedQs | ParsedQs[] {
    return this._params[key];
  }
}
