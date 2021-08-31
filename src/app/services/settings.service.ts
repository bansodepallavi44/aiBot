import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Privilege } from '../interfaces/privilege';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  /**
   * @name collaboratorsList
   * @description getting list of all collaborator
   * @param  {any} apiAuth
   */
  public collaboratorsList(apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(
      `${environment.API_BASE_URL}/view_list_of_collaborators`,
      httpOptions
    );
  }

  /**
   * @name createCollaborators
   * @description create createCollaborators
   * @param  {FormData} collaborator
   * @param  {any} apiAuth
   */
  public createCollaborators(collaborator: FormData, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.post(
      `${environment.API_BASE_URL}/register_as_collaborator`,
      collaborator,
      httpOptions
    );
  }

  public editCollaborator(id: number,privilege: Privilege, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.patch(
      `${environment.API_BASE_URL}/edit_collaborator?id=` + id, privilege,
      httpOptions
    );
  }

  /**
   * @name deleteCollaborator
   * @description deleting collaborator
   * @param  {number} id
   * @param  {any} apiAuth
   */
  public deleteCollaborator(id: number, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.delete(
      `${environment.API_BASE_URL}/delete_collaborator?id=` + id,
      httpOptions
    );
  }

  /**
   * @name privilegeGroupList
   * @description getting list of privileges group
   * @param  {any} apiAuth
   */
  public privilegeGroupList(apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(
      `${environment.API_BASE_URL}/show_list_of_privilege_groups`,
      httpOptions
    );
  }


  public teamCollaboratorList(apiAuth: any,id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.get(
      `${environment.API_BASE_URL}/show_list_of_privilege_groups?id=${id}`,
      httpOptions
    );
  }


  /**
   * @name createPrivilegeGroup
   * @description creating privilege group
   * @param  {any} apiAuth
   */
  public createPrivilegeGroup(privilege: FormData, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.post(
      `${environment.API_BASE_URL}/create_privilege_group`,
      privilege,
      httpOptions
    );
  }

  public editPrivilegeGroup(
    id: number,
    privilege: any,
    apiAuth: any
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.patch(
      `${environment.API_BASE_URL}/edit_privilege_group?id=` + id,
      privilege,
      httpOptions
    );
  }

  /**
   * @name deletePrivilegeGroup
   * @description delete privilege group
   * @param  {number} id
   * @param  {any} apiAuth
   */
  public deletePrivilegeGroup(id: number, apiAuth: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: apiAuth,
      }),
    };
    return this.http.delete(
      `${environment.API_BASE_URL}/delete_privilege_group?id=` + id,
      httpOptions
    );
  }
}
