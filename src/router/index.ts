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
        path: '/about-us',
        name: 'AboutUs',
        component: () =>
          import(
            /* webpackChunkName: "about-us" */ '../views/footer/AboutUs.vue'
          ),
      },
      {
        path: '/bonus-terms',
        name: 'BonusTerms',
        component: () =>
          import(
            /* webpackChunkName: "bonus-terms" */ '../views/footer/BonusTerms.vue'
          ),
      },
      {
        path: '/careers',
        name: 'Careers',
        component: () =>
          import(
            /* webpackChunkName: "careers" */ '../views/footer/Careers.vue'
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
        path: '/game-rules',
        name: 'GameRules',
        component: () =>
          import(
            /* webpackChunkName: "game-rules" */ '../views/footer/GameRules.vue'
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
        path: '/responsible-gambling',
        name: 'ResponsibleGambling',
        component: () =>
          import(
            /* webpackChunkName: "responsible-gambling" */ '../views/footer/ResponsibleGambling.vue'
          ),
      },
      {
        path: '/security-privacy-policy',
        name: 'SecurityPrivacyPolicy',
        component: () =>
          import(
            /* webpackChunkName: "security-privacy-policy" */ '../views/footer/SecurityPrivacyPolicy.vue'
          ),
      },
      {
        path: '/terms-of-use',
        name: 'TermsOfUse',
        component: () =>
          import(
            /* webpackChunkName: "terms-of-use" */ '../views/footer/TermsOfUse.vue'
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
            path: 'account-and-security',
            name: 'AccountAndSecurity',
            component: () =>
              import(
                /* webpackChunkName: "account-and-security" */ '../views/user/accountAndSecurity/AccountAndSecurity.vue'
              ),
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
            path: 'balance-rewards',
            name: 'BalanceRewards',
            component: () =>
              import(
                /* webpackChunkName: "balance-rewards" */ '../views/user/balance/Rewards.vue'
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
            path: 'bonuses',
            name: 'Bonuses',
            component: () =>
              import(
                /* webpackChunkName: "bonuses" */ '../views/user/bonuses/Bonuses.vue'
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
            path: 'game-history',
            name: 'GameHistory',
            component: () =>
              import(
                /* webpackChunkName: "game-history" */ '../views/user/gameHistory/GameHistory.vue'
              ),
          },
          {
            path: 'limit',
            name: 'Limit',
            component: () =>
              import(
                /* webpackChunkName: "limit" */ '../views/user/limit/Limit.vue'
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
            path: 'my-rewards',
            name: 'MyRewards',
            component: () =>
              import(
                /* webpackChunkName: "my-rewards" */ '../views/user/myRewards/MyRewards.vue'
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
            path: 'payments-history',
            name: 'PaymentsHistory',
            component: () =>
              import(
                /* webpackChunkName: "payments-history" */ '../views/user/payment/PaymentsHistory.vue'
              ),
          },

          {
            path: 'personal-settings',
            name: 'PersonalSettings',
            component: () =>
              import(
                /* webpackChunkName: "personal-settings" */ '../views/user/personalSettings/PersonalSettings.vue'
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
            path: 'verification',
            name: 'Verification',
            component: () =>
              import(
                /* webpackChunkName: "verification" */ '../views/user/personalSettings/Verification.vue'
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

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_PATH || ''),
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
