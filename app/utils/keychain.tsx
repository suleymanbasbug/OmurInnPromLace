import {TOKEN_STORAGE_KEY} from '@app/helpers/keychainVariables';
import {LoginApiResponse} from '@app/services/auth';
import * as Keychain from 'react-native-keychain';
import {initialState} from '@app/store/userSlice';
export async function saveKeyToKeychain(
  key: string,
  value: string,
): Promise<void> {
  try {
    await Keychain.setGenericPassword(key, value, {
      service: key,
    });
  } catch (error) {}
}

export async function getTokenFromKeychain(): Promise<LoginApiResponse> {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: TOKEN_STORAGE_KEY,
    });

    if (credentials) {
      // Data found in the keychain
      const {password} = credentials;
      const parsedCredentials: LoginApiResponse = JSON.parse(password);
      return parsedCredentials;
    } else {
      return initialState;
      // console.log('No credentials found in the keychain.');
    }
  } catch (error) {
    return initialState;
    // console.log('Error loading data from the keychain:', error);
  }
}

export async function saveTokenToKeychain(
  state: LoginApiResponse,
): Promise<void> {
  try {
    const stringifiedState = JSON.stringify(state);
    await saveKeyToKeychain(TOKEN_STORAGE_KEY, stringifiedState);
  } catch (error) {}
}
