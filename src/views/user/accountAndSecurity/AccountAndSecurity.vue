<template>
  <Container>
    <div class="bonus-block-group">
      <Heading
        :title="t('account_and_security.title')"
        :define="t('account_and_security.define')"
      />
      <OutlineCard class="outlineCard">
        <div class="bulletin">
          <div class="bulletin-content">
            <div class="bulletin-title">
              {{ t('account_and_security.change_password') }}
            </div>
            <div class="bulletin-define">
              {{ t('account_and_security.change_password_define') }}
            </div>
          </div>
          <router-link class="bulletin-button" to="/user/change-password">
            <Button variant="outlined" size="small">
              {{ t('common.update') }}
            </Button>
          </router-link>
        </div>
      </OutlineCard>
    </div>
    <div class="bonus-block-group">
      <OutlineCard>
        <div class="bulletin">
          <div class="bulletin-content">
            <div class="bulletin-title">
              {{ t('account_and_security.withdraw_password') }}
            </div>
            <div class="bulletin-define">
              {{ t('account_and_security.withdraw_password_define') }}
            </div>
          </div>
          <router-link
            v-if="userSotre.userInfo?.hasWithdrawalPasswordBeenSet"
            class="bulletin-button"
            to="/user/change-withdraw-password"
          >
            <Button variant="outlined" size="small">
              {{ t('common.update') }}
            </Button>
          </router-link>
        </div>
      </OutlineCard>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import Container from '@/layout/Container.vue';
import Heading from '@/components/Heading.vue';
import OutlineCard from '@/components/OutlineCard.vue';
import Button from '@/components/Button.vue';
import useUserStore from '@/modules/user/Infrastructure/store/userStore';
// use i18n
const { t } = useI18n();
const userSotre = useUserStore();
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';
.outlineCard {
  overflow: auto;
}
.bonus-block-group {
  & + & {
    margin-top: 32px;
  }
}
.bulletin {
  box-sizing: border-box;
  display: flex;
  padding: 28px 20px;
  min-width: 320px;

  .bulletin-content {
    display: flex;
    align-items: center;
    margin-right: 20px;

    @include mobile {
      flex-direction: column;
      align-items: unset;
    }
  }

  .bulletin-title,
  .bulletin-define {
    font-size: 18px;
    line-height: 20px;
    color: var(--text-secondary);

    @include mobile {
      font-size: 12px;
      line-height: 16px;
    }
  }

  .bulletin-title {
    width: 160px;
  }
  .bulletin-define {
    margin-left: 20px;
    color: var(--text-primary);
    @include mobile {
      margin: 4px 0 0;
    }
  }

  .bulletin-button {
    margin: auto 0 auto auto;
    max-height: 40px;

    @include mobile {
      max-height: 24px;
    }
  }
}
</style>
