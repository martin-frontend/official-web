import useAuthStore from '@/core/auth/authStore';
import { initVisitorId } from '@/core/services/visitorId';
/* eslint-disable @typescript-eslint/no-explicit-any */
import useVisitorIdStore from '@/core/auth/visitorId';
import { getAuthToken } from '../localStorage/authToken';
import { getLocalLanguage } from '../localStorage/language';
/* eslint-disable import/prefer-default-export */
import clearAuth from '@/core/auth/clearAuth';
import { router } from '@/router';
import useToastStore from '../../shared/toastStore';

export function createOptions() {
  const visitorIdStore = useVisitorIdStore();

  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'x-csrf-token': getAuthToken(),
      'Accept-Language': getLocalLanguage(),
      'Visitor-Id': visitorIdStore.visitorId,
    },
  };
}

export const basePath = 'api';

export async function fetchWrapper<T>(
  input: string,
  // eslint-disable-next-line
  init?: Record<string, unknown> | RequestInit
): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const { message, errors } = await response.json();

    if (response.status === 401) {
      const authStore = useAuthStore();

      if (authStore.isAuthenticated) {
        console.log(message, errors);
        clearAuth();

        router.push('/');

        const toastStore = useToastStore();

        toastStore.addToastMessage({
          color: 'danger',
          toastTitle: 'Error',
          toastDescription: message,
          isIconError: true,
        });
      }
    }

    return Promise.reject(message || errors || 'An unknown error occurred');
  }

  try {
    const { data } = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return null!;
  }
}

export function createUrlWithParams(
  url: string,
  params?: { [key: string]: string | string[] }
): string {
  if (!params) {
    return url;
  }

  const queryString = Object.keys(params)
    .map((key) =>
      Array.isArray(params[key])
        ? (params[key] as string[]).map((item) => `${key}=${item}`).join('&')
        : `${key}=${params[key]}`
    )
    .join('&');

  return `${url}?${queryString}`;
}

export async function fetchGet<T>(
  path: string,
  params?: Record<string, any>
): Promise<T> {
  const url = createUrlWithParams(`${basePath}${path}`, params);

  await initVisitorId();

  const response = await fetchWrapper<T>(url, {
    method: 'GET',
    ...createOptions(),
  });

  return response;
}

export async function fetchPost<T>(
  path: string,
  body?: Record<string, any> | number | boolean,
  params?: Record<string, any>
): Promise<T> {
  const url = createUrlWithParams(`${basePath}${path}`, params);

  await initVisitorId();

  const response = await fetchWrapper<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...createOptions(),
  });

  return response;
}

export async function fetchPut<T>(
  path: string,
  body?: Record<string, any>,
  params?: Record<string, any>
): Promise<T> {
  const url = createUrlWithParams(`${basePath}${path}`, params);

  await initVisitorId();

  const response = await fetchWrapper<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...createOptions(),
  });

  return response;
}

export async function fetchDelete<T>(
  path: string,
  params?: Record<string, any>
): Promise<T> {
  const url = createUrlWithParams(`${basePath}${path}`, params);

  await initVisitorId();

  const response = await fetchWrapper<T>(url, {
    method: 'DELETE',
    ...createOptions(),
  });

  return response;
}
