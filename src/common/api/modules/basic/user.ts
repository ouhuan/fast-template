import featch from '@/common/api/fetch';
import { UserInfo, GetUserInfoPar } from './model/userModel';

enum Api {
  GetUserInfo = '/account/get',
}
/**
 * @description: user api
 */
export function loginApi(data: GetUserInfoPar = { userId: 0 }) {
  return featch.get<UserInfo>(Api.GetUserInfo, { data });
}
