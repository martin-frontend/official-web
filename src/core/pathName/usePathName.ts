import { useRoute } from 'vue-router';

export function usePathName() {
  const route = useRoute();

  const pathName = window.location.pathname;

  const curPath = route.path;

  return pathName.replace(curPath, '');
}
