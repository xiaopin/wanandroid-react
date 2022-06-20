/**
 * 全局数据存储
 *
 * const [value, setValue] = useXxxxState()
 * const value = useXxxxValue()
 * const setter = useUpdateXxxx()
 * const resetter = useResetXxxx()
 */
import { useCookie } from 'react-use'
import * as Recoil from 'recoil'

export const accountState = Recoil.atom<ApiResp.AccountModel | undefined>({
    key: 'AccountStore',
    default: undefined
})
export const useAccountState = () => Recoil.useRecoilState(accountState)
export const useAccountValue = () => Recoil.useRecoilValue(accountState)
export const useUpdateAccount = () => Recoil.useSetRecoilState(accountState)
export const useResetAccount = () => Recoil.useResetRecoilState(accountState)
