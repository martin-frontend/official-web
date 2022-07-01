/* eslint-disable import/no-unresolved */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import checkAuthToken from '@/core/auth/checkAuthToken';
import { checkUserStatus } from '@/modules/user/application/user';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layout/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
      },
      {
        path: '/terms-of-service',
        name: 'TermsOfService',
        component: () =>
          import(
            /* webpackChunkName: "terms-of-service" */ '../views/footer/TermsOfService.vue'
          ),
      },
      {
        path: '/responsible-gambling',
        name: 'ResponsibleGambling',
        component: () =>
          import(
            /* webpackChunkName: "responsible-gambling" */ '../views/footer/ResponsibleGambling.vue'
          ),
      },
      {
        path: '/seif-exclusion-terms',
        name: 'SeifExclusionTerms',
        component: () =>
          import(
            /* webpackChunkName: "seif-exclusion-terms" */ '../views/footer/SeifExclusionTerms.vue'
          ),
      },
      {
        path: '/dispute-resolution-terms',
        name: 'DisputeResolutionTerms',
        component: () =>
          import(
            /* webpackChunkName: "dispute-resolution-terms" */ '../views/footer/DisputeResolutionTerms.vue'
          ),
      },
      {
        path: '/aml-policy',
        name: 'AmlPolicy',
        component: () =>
          import(
            /* webpackChunkName: "aml-policy" */ '../views/footer/AmlPolicy.vue'
          ),
      },
      {
        path: '/kyc-data-policies',
        name: 'KycDataPolicies',
        component: () =>
          import(
            /* webpackChunkName: "kyc-data-policies" */ '../views/footer/KycDataPolicies.vue'
          ),
      },
      {
        path: '/terms-of-accounts',
        name: 'TermsOfAccounts',
        component: () =>
          import(
            /* webpackChunkName: "terms-of-accounts" */ '../views/footer/TermsOfAccounts.vue'
          ),
      },
      {
        path: '/certification',
        name: 'Certification',
        component: () =>
          import(
            /* webpackChunkName: "certification" */ '../views/footer/Certification.vue'
          ),
      },
      {
        path: '/email-verification',
        name: 'EmailVerification',
        component: () =>
          import(
            /* webpackChunkName: "email-verification" */ '../views/home/Home.vue'
          ),
      },
      {
        path: '/gamePlay',
        name: 'Game Play',
        component: () =>
          import(
            /* webpackChunkName: "game-play" */ '../views/gamePlay/GamePlay.vue'
          ),
      },
      {
        path: '/get-in-touch',
        name: 'GetInTouch',
        component: () =>
          import(
            /* webpackChunkName: "get-in-touch" */ '../views/getInTouch/GetInTouch.vue'
          ),
      },
      {
        path: '/payment-options',
        name: 'PaymentOptions',
        component: () =>
          import(
            /* webpackChunkName: "payment-options" */ '../views/user/payment/PaymentOptions.vue'
          ),
      },
      {
        path: '/promotions',
        name: 'Promotions',
        component: () =>
          import(
            /* webpackChunkName: "promotions" */ '../views/promotions/Promotions.vue'
          ),
      },
      {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () =>
          import(
            /* webpackChunkName: "reset-password" */ '../views/resetPassword/ResetPassword.vue'
          ),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user/User.vue'),
        async beforeEnter(to, from, next) {
          if (await checkUserStatus()) {
            next();
            return;
          }
          next('/');
        },
        children: [
          {
            path: 'my-account',
            name: 'MyAccount',
            redirect: '/user/my-account/personal-settings',
            component: () => import('../views/user/myAccount/MyAccount.vue'),
            children: [
              {
                path: 'personal-settings',
                name: 'PersonalSettings',
                component: () =>
                  import(
                    /* webpackChunkName: "personal-settings" */ '../views/user/personalSettings/PersonalSettings.vue'
                  ),
              },
              {
                path: 'verification',
                name: 'Verification',
                component: () =>
                  import(
                    /* webpackChunkName: "verification" */ '../views/user/personalSettings/Verification.vue'
                  ),
              },
              {
                path: 'account-and-security',
                name: 'AccountAndSecurity',
                component: () =>
                  import(
                    /* webpackChunkName: "account-and-security" */ '../views/user/accountAndSecurity/AccountAndSecurity.vue'
                  ),
                children: [
                  {
                    path: 'change-password',
                    name: 'ChangePassword',
                    component: () =>
                      import(
                        /* webpackChunkName: "change-password" */ '../views/user/accountAndSecurity/ChangePassword.vue'
                      ),
                  },
                  {
                    path: 'change-withdraw-password',
                    name: 'ChangeWithdrawPassword',
                    component: () =>
                      import(
                        /* webpackChunkName: "change-withdraw-password" */ '../views/user/accountAndSecurity/ChangeWithdrawPassword.vue'
                      ),
                  },
                  {
                    path: 'change-withdraw-account',
                    name: 'MyWithdrawAccount',
                    component: () =>
                      import(
                        /* webpackChunkName: "change-withdraw-account" */ '../views/user/accountAndSecurity/MyWithdrawAccount.vue'
                      ),
                  },
                ],
              },
              {
                path: 'limit',
                name: 'Limit',
                component: () =>
                  import(
                    /* webpackChunkName: "limit" */ '../views/user/limit/Limit.vue'
                  ),
              },
            ],
          },
          {
            path: 'history',
            name: 'History',
            redirect: '/user/history/game-history',
            component: () => import('../views/user/history/History.vue'),
            children: [
              {
                path: 'game-history',
                name: 'GameHistory',
                component: () =>
                  import(
                    /* webpackChunkName: "game-history" */ '../views/user/gameHistory/GameHistory.vue'
                  ),
              },
              {
                path: 'balance-withdraw',
                name: 'BalanceWithdraw',
                component: () =>
                  import(
                    /* webpackChunkName: "balance-withdraw" */ '../views/user/balance/Withdraw.vue'
                  ),
              },
              {
                path: 'deposit-history',
                name: 'DepositHistory',
                component: () =>
                  import(
                    /* webpackChunkName: "deposit-history" */ '../views/user/payment/PaymentsHistory.vue'
                  ),
              },
              {
                path: 'withdraw-history',
                name: 'WithdrawHistory',
                component: () =>
                  import(
                    /* webpackChunkName: "withdraw-history" */ '../views/user/payment/PaymentsHistory.vue'
                  ),
              },
              {
                path: 'login-history',
                name: 'LoginHistory',
                component: () =>
                  import(
                    /* webpackChunkName: "login-history" */ '../views/user/loginHistory/LoginHistory.vue'
                  ),
              },
              {
                path: 'payment-transactions',
                name: 'PaymentTransactions',
                component: () =>
                  import(
                    /* webpackChunkName: "payment-transactions" */ '../views/user/payment/PaymentTransactions.vue'
                  ),
              },
              {
                path: 'bonuses-history',
                name: 'BonusesHistory',
                component: () =>
                  import(
                    /* webpackChunkName: "bonuses-history" */ '../views/user/bonusesHistory/BonusesHistory.vue'
                  ),
              },
              {
                path: 'balance-rewards',
                name: 'BalanceRewards',
                component: () =>
                  import(
                    /* webpackChunkName: "balance-rewards" */ '../views/user/balance/Rewards.vue'
                  ),
              },
            ],
          },
          {
            path: 'balance',
            name: 'Balance',
            component: () =>
              import(
                /* webpackChunkName: "balance" */ '../views/user/balance/Balance.vue'
              ),
          },
          {
            path: 'bonuses',
            name: 'Bonuses',
            component: () =>
              import(
                /* webpackChunkName: "bonuses" */ '../views/user/bonuses/Bonuses.vue'
              ),
          },
          {
            path: 'deposit',
            name: 'Deposit',
            component: () =>
              import(
                /* webpackChunkName: "deposit" */ '../views/user/deposit/Deposit.vue'
              ),
          },
          {
            path: 'favorite-games',
            name: 'FavoriteGames',
            component: () =>
              import(
                /* webpackChunkName: "favorite-games" */ '../views/user/favoriteGames/FavoriteGames.vue'
              ),
          },
          {
            path: 'my-rewards',
            name: 'MyRewards',
            component: () =>
              import(
                /* webpackChunkName: "my-rewards" */ '../views/user/myRewards/MyRewards.vue'
              ),
          },
          {
            path: 'refer-friend',
            name: 'ReferFriend',
            component: () =>
              import(
                /* webpackChunkName: "refer-friend" */ '../views/user/referFriend/ReferFriend.vue'
              ),
          },
          {
            path: 'withdraw',
            name: 'Withdraw',
            component: () =>
              import(
                /* webpackChunkName: "withdraw" */ '../views/user/withdraw/Withdraw.vue'
              ),
          },
        ],
      },
      {
        path: 'guideline',
        name: 'Guideline',
        component: () => import('../views/guideline/Guideline.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

export const baseHref =
  document.head?.querySelector('base')?.getAttribute('href') || '/';

export const router = createRouter({
  history: createWebHistory(baseHref),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthToken();

  if (to.path.startsWith('/user') && !isAuthenticated) {
    next({ name: 'Home' });
  } else next();
  return false;
});

export default router;
