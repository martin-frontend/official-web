import { Component } from 'vue';
import IconAccount from '@/components/icons/IconAccount.vue';
import IconWallet from '@/components/icons/IconWallet.vue';
import IconDeposit from '@/components/icons/IconDeposit.vue';
import IconMenuHistory from '@/components/icons/IconMenuHistory.vue';
import IconReferFriend from '@/components/icons/IconReferFriend.vue';
import IconFavourite from '@/components/icons/IconFavourite.vue';
import coin from '@/assets/icons/coin.png';
import MenuBonuses from '@/assets/icons/MenuBonuses.png';

export interface RouteListBase {
  name: string;
  path: string;
}

export interface RouteList extends RouteListBase {
  icon?: Component;
  image?: string;
  children?: RouteListBase[];
}

export const routeList: RouteList[] = [
  {
    path: '/user/my-account',
    icon: IconAccount,
    name: 'My Account',
    children: [
      {
        name: 'Personal Detail',
        path: '/user/my-account/personal-settings',
      },
      {
        name: 'Verfication',
        path: '/user/my-account/verification',
      },
      {
        name: 'Account And Security',
        path: '/user/my-account/account-and-security',
      },
      {
        name: 'Gambling Limit',
        path: '/user/my-account/limit',
      },
    ],
  },
  {
    path: '/user/balance',
    icon: IconWallet,
    name: 'Wallet',
  },
  {
    path: '/user/bonuses',
    image: MenuBonuses,
    name: 'Bonuses',
  },
  {
    path: '/user/my-rewards',
    image: coin,
    name: 'Rewards',
  },
  {
    path: '/user/deposit',
    icon: IconDeposit,
    name: 'Deposit',
  },
  {
    path: '/user/history',
    icon: IconMenuHistory,
    name: 'History',
    children: [
      {
        name: 'Game',
        path: '/user/history/game-history',
      },
      {
        name: 'Wallet',
        path: '/user/history/balance-withdraw',
      },
      {
        name: 'Deposit',
        path: '/user/history/deposit-history',
      },
      {
        name: 'Withdraw',
        path: '/user/history/withdraw-history',
      },
      {
        name: 'Login',
        path: '/user/history/login-history',
      },
      {
        name: 'Withdraw Limit Record',
        path: '/user/history/payment-transactions',
      },
      {
        name: 'Bonuses Record',
        path: '/user/history/bonuses-history',
      },
      {
        name: 'Reward Record',
        path: '/user/history/balance-rewards',
      },
    ],
  },
  {
    path: '/user/refer-friend',
    icon: IconReferFriend,
    name: 'Refer Friend',
  },
  {
    path: '/user/favorite-games',
    icon: IconFavourite,
    name: 'Favourite',
  },
];
