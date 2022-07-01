<template>
  <footer v-show="isShown" class="footer">
    <section class="footer__links">
      <ul class="footer__link">
        <li v-for="(item, idx) of list" :key="idx">
          <router-link :to="`/${item.path}`">
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </section>
    <div class="footer__assert">
      <p>
        {{
          'The website is owned by Miragetech B.V. , registration no 158882,registered address is at Dr. M.J. Hugenholtzweg 25, Unit 11 Curacao.'
        }}
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isShown = computed<boolean>(() => !route.path.includes('gamePlay'));

const list = [
  {
    name: 'Terms of Service',
    path: 'terms-of-service',
  },
  {
    name: 'Responsible Gaming terms',
    path: 'responsible-gambling',
  },
  {
    name: 'Self-Exclusion terms',
    path: 'seif-exclusion-terms',
  },
  {
    name: 'Dispute Resolution terms',
    path: 'dispute-resolution-terms',
  },
  {
    name: 'AML Policy',
    path: 'aml-policy',
  },
  {
    name: 'KYC Policies、Data Policies',
    path: 'kyc-data-policies',
  },
  {
    name: 'Terms of Accounts',
    path: 'terms-of-accounts',
  },
  {
    name: 'Certification',
    path: 'certification',
  },
];
</script>

<style lang="scss" scoped>
@import '../styles/mediaQuery.scss';

.link {
  color: var(--primary-color);
}

.footer {
  &__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 22px 20px 20px;
    background: var(--secondary-variants-color);

    @include pad {
      padding: 20px 21px;
    }
  }

  &__link {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-sizing: border-box;
    margin: -8px 0;

    li {
      position: relative;
      box-sizing: border-box;
      margin: 8px 0;
      padding: 0 18px;
      line-height: 20px;

      a {
        color: var(--text-primary);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 0;
        display: inline-block;
        width: 1px;
        height: 16px;
        background-color: #fff;
      }

      &:first-child {
        &::before {
          content: none;
        }
      }

      @include laptop {
        font-size: 14px;
        line-height: 22px;
      }

      @include pad {
        margin: 6px 0;
        padding: 0 8px;

        &::before {
          bottom: 3px;
        }
      }
    }

    @include pad {
      margin: -6px 0;
    }
  }

  &__assert {
    box-sizing: border-box;
    width: 100%;
    padding: 24px 40px 36px;
    background-color: var(--secondary-color);
    color: #9e9e9e;
    font-size: 14px;
    line-height: 22px;
    text-align: center;

    @include laptop {
      padding: 24px 32px 36px;
      font-size: 12px;
      line-height: 16px;
    }

    @include pad {
      padding: 16px 16px 36px;
    }
  }
}
</style>
