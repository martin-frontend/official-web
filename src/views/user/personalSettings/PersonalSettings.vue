/* eslint-disable no-unused-vars */
<template>
  <div>
    <Heading :define="t('personal_settings.define')" />
    <div class="informations-wrap">
      <div class="informations-wrap-item">
        <!-- Basic Information -->
        <div class="infoCard">
          <div class="infoCard-avatar">
            <div class="avatar">
              <p>{{ userNameLetter }}</p>
            </div>
            <div class="infoCard-title">
              {{ t('personal_settings.basic_information.title') }}
            </div>
          </div>
          <div class="infoCard-content">
            <ul class="infoList">
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Name' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">{{ allInfos?.name }}</Text>
                  </div>
                  <div v-if="allInfos?.nameUpdatable" class="infoList-action">
                    <Button
                      variant="outlined"
                      size="small"
                      @click="setNoticeDialog"
                    >
                      {{ 'Update' }}
                    </Button>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Player Level' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">{{ allInfos?.level }}</Text>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Birthday' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.birthday }}
                    </Text>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Registration time' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.createdAt }}
                    </Text>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Last Login Time' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.lastLoginAt }}
                    </Text>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Language' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.language }}
                    </Text>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="informations-wrap-item">
        <!-- Contact Information -->
        <div class="infoCard">
          <div class="infoCard-top">
            <div class="infoCard-title">
              {{ t('personal_settings.contact_information.title') }}
            </div>
          </div>
          <div class="infoCard-content">
            <ul class="infoList">
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Email' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">{{ allInfos?.email }}</Text>
                  </div>
                  <div class="infoList-action">
                    <IconBase
                      v-if="allInfos?.emailVerified"
                      :width="24"
                      :height="24"
                      viewBox="0 0 24 24"
                    >
                      <IcondoubleCheck />
                    </IconBase>
                    <Button
                      v-else
                      variant="outlined"
                      size="small"
                      @click="verifyEmail"
                    >
                      {{ 'Verify' }}
                    </Button>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Telephone' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">{{ allInfos?.telephone }}</Text>
                  </div>
                  <div class="infoList-action">
                    <IconBase
                      v-if="allInfos?.phoneNumberVerified"
                      :width="24"
                      :height="24"
                      viewBox="0 0 24 24"
                    >
                      <IcondoubleCheck />
                    </IconBase>
                    <Button
                      v-else
                      variant="outlined"
                      size="small"
                      @click="verifyOtp"
                    >
                      {{ 'Verify' }}
                    </Button>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Country' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.city }}
                    </Text>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Address' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.address }}
                    </Text>
                  </div>
                  <div class="infoList-action">
                    <IconBase
                      v-if="allInfos?.kycLevel === 2"
                      :width="24"
                      :height="24"
                      viewBox="0 0 24 24"
                    >
                      <IcondoubleCheck />
                    </IconBase>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- Verify Your Identity -->
        <div class="infoCard">
          <div class="infoCard-top">
            <div class="infoCard-title">
              {{ t('personal_settings.very_identiy.title') }}
            </div>
          </div>
          <div class="infoCard-content">
            <ul class="infoList">
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Status' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.status }}
                    </Text>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'Account Type' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text device="mobile">
                      {{ allInfos?.accountType }}
                    </Text>
                  </div>
                </div>
              </li>
              <li class="infoList-item">
                <div class="infoList-title">
                  <Text color="secondary" device="mobile">
                    {{ 'KYC Level' }}
                  </Text>
                </div>
                <div class="infoList-main">
                  <div class="infoList-content">
                    <Text
                      v-if="
                        allInfos?.kycLevel === 1 || allInfos?.kycLevel === 2
                      "
                      device="mobile"
                    >
                      {{ 'KYC' }}
                      {{ allInfos?.kycLevel }}
                    </Text>
                  </div>
                  <div class="infoList-action">
                    <IconBase
                      v-if="allInfos?.kycLevel === 2"
                      :width="24"
                      :height="24"
                      viewBox="0 0 24 24"
                    >
                      <IcondoubleCheck />
                    </IconBase>
                    <router-link v-else to="/user/my-account/verification">
                      <Button size="small">
                        {{ 'Verification' }}
                      </Button>
                    </router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="informations-wrap-single">
      <div class="informations-wrap-item">
        <Text size="sm" color="surface">
          {{ t('personal_settings.warning') }}
        </Text>
      </div>
    </div>

    <div class="informations-wrap">
      <div class="informations-wrap-item">
        <div class="infoCard security">
          <div class="infoCard-content">
            <div class="infoCard-title security">
              {{ t('personal_settings.account_and_security') }}
            </div>
            <div class="infoCard-subtitle security">
              <Text color="secondary">
                {{ t('personal_settings.account_and_security_message') }}
              </Text>
            </div>
          </div>
          <router-link
            class="security-button"
            to="/user/my-account/account-and-security"
          >
            <Button variant="outlined" size="small">
              {{ t('common.update') }}
            </Button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="informations-wrap">
      <div class="informations-wrap-item">
        <div class="infoCard">
          <div class="infoCard-top">
            <div class="infoCard-title">
              {{ t('personal_settings.consents.title') }}
            </div>
            <div class="infoCard-subtitle">
              <Text color="secondary">
                {{ t('personal_settings.consents.subtitle') }}
              </Text>
            </div>
          </div>
          <div class="infoCard-content">
            <Checkbox
              id="consents"
              v-model="isChecked"
              :label="t('personal_settings.checkopts.accept_terms')"
            />
          </div>
          <div class="infoCard-action">
            <Button
              v-if="isChecked !== userData?.notificationEnabled"
              color="primary"
              variant="block"
              @click="updateChecked"
            >
              {{ t('common.save') }}
            </Button>
            <Button v-else color="disabled" variant="block">
              {{ t('common.save') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="informations-wrap-single">
      <div class="informations-wrap-item">
        <Text size="sm" color="surface">
          {{ t('personal_settings.reminder') }}
        </Text>
      </div>
    </div>
  </div>
  <VerifyEmailDialog v-model:visible="emailDialog" @close="close" />
  <VerifyPhoneDialog v-model:visible="phoneNumberDialog" @close="close" />
  <UpdateNameDialog v-model:visible="updateNameDialog" @close="close" />
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { UserInfo } from '@/modules/user/domain/user.model';
import getUserInfo from '@/modules/user/application/user';
import updateConsents from '@/modules/user/Infrastructure/api/consent.api';
import sendVerificationEmail from '@/modules/user/Infrastructure/api/verifyEmail.api';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Typography.vue';
import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IcondoubleCheck from '@/components/icons/IcondoubleCheck.vue';
import VerifyEmailDialog from './VerifyEmailDialog.vue';
import VerifyPhoneDialog from './VerifyPhoneDialog.vue';
import { sendPhoneNumberOtp } from '@/modules/user/Infrastructure/api/verifyPhone.api';
import useDialogStore from '@/core/shared/dialogStore';
import UpdateNameDialog from './UpdateNameDialog.vue';
import { usePathName } from '@/core/pathName/usePathName';

const { t } = useI18n();

const phoneNumberDialog = ref(false);
const emailDialog = ref(false);
const updateNameDialog = ref(false);
const userData = ref<UserInfo | null>(null);
const allInfos = computed(() => {
  const data = userData.value;
  if (!data) {
    return null;
  }

  const infos = {
    name: `${data.firstname} ${data.lastname}`,
    level: data.level,
    birthday: moment(data.birthday).format('YYYY-MM-DD'),
    createdAt: moment(data.createdAt).format('YYYY-MM-DD hh:mm:ss'),
    lastLoginAt: moment(data.lastLoginAt).format('YYYY-MM-DD hh:mm:ss'),
    language: data.language,
    email: data.email,
    telephone: data.phoneNumber,
    city: data.city,
    address: data.address,
    status: '',
    accountType: data.type,
    kycLevel: data.kycLevel,
    hasWithdrawalPasswordBeenSet: data.hasWithdrawalPasswordBeenSet,
    nameUpdatable: data.nameUpdatable,
    emailVerified: data.emailVerified,
    phoneNumberVerified: data.phoneNumberVerified,
  };
  return infos;
});
const isChecked = ref();
const userNameLetter = computed(() =>
  userData.value?.firstname?.substring(0, 2)
);

const dialogStore = useDialogStore();

const setNoticeDialog = () => {
  dialogStore.popUp({
    title: t('common.notice'),
    message: t('personal_settings.update_name_warning'),
    secondMessage: t('personal_settings.update_name_note'),
    isCancelButtonShown: true,
    onCancel() {
      dialogStore.close();
    },
    isOkButtonShown: false,
    isOtherOkButtonShown: true,
    okOtherButtonText: t('common.update'),
    onOtherOk() {
      updateNameDialog.value = true;
      dialogStore.close();
    },
  });
};

function close() {
  phoneNumberDialog.value = false;
  emailDialog.value = false;
  updateNameDialog.value = false;
  getUserInfo().then((data) => {
    userData.value = data;
    isChecked.value = data?.notificationEnabled;
  });
}

function verifyOtp() {
  phoneNumberDialog.value = true;
  sendPhoneNumberOtp();
}

const pathName = usePathName();

function verifyEmail() {
  emailDialog.value = true;

  const emailLinkUrlPath = `${pathName}/email-verification`;

  sendVerificationEmail(emailLinkUrlPath).then(() => {
    emailDialog.value = true;
  });
}

function updateChecked() {
  updateConsents(isChecked.value).then(() => {
    getUserInfo().then((data) => {
      userData.value = data;
      isChecked.value = data?.notificationEnabled;
    });
  });
}

onMounted(() => {
  getUserInfo().then((data) => {
    userData.value = data;
    isChecked.value = data?.notificationEnabled;
  });
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.informations-wrap {
  display: flex;
  margin: 0 -12px;

  & + & {
    margin-top: 24px;
  }

  .informations-wrap-item {
    box-sizing: border-box;
    width: 100%;
    padding: 0 12px;
  }

  @include tablet-v {
    flex-direction: column;
    margin: 0;

    .informations-wrap-item {
      padding: 0;

      margin-top: 24px;
      &:first-child {
        margin-top: 0;
      }
    }
  }

  @include mobile {
    flex-direction: column;
    margin: 0;

    .informations-wrap-item {
      margin-top: 12px;
      padding: 0;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
.informations-wrap-single {
  margin: 24px 0;
  text-align: center;

  @include mobile {
    margin: 16px 0;
  }
}
.infoCard {
  box-sizing: border-box;
  padding: 24px 32px;
  margin-top: 24px;
  overflow: hidden;
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: var(--secondary-variants-color);

  &:first-child {
    margin-top: 0;
  }

  &.security {
    display: flex;
    .security-button {
      // width: 55px;
      margin-left: auto;
      @include mobile {
        margin-top: auto;
      }
    }
  }

  .infoCard-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .infoCard-avatar {
    width: 100%;
    height: 222px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .infoCard-title {
    font-size: 26px;
    line-height: 26px;
    color: var(--primary-color);
    text-align: center;
    &.security {
      text-align: left;
    }
  }

  .infoCard-content {
    margin-top: 24px;

    &:first-child {
      margin-top: 0;
    }
  }

  .infoCard-subtitle {
    margin-top: 4px;
    text-align: center;

    &.security {
      text-align: left;
    }
  }

  .infoCard-action {
    margin-top: 24px;
  }

  @include mobile {
    padding: 16px;
    margin-top: 12px;

    &:first-child {
      margin-top: 0;
    }

    .infoCard-avatar {
      height: 108px;
    }

    .infoCard-title {
      font-size: 18px;
      line-height: 20px;
    }
  }
}
.infoList {
  width: 100%;
  .infoList-item {
    box-sizing: border-box;
    height: 72px;
    padding: 16px 0;
    display: flex;
    align-items: center;
    border-top: 1px solid var(--primary-color);

    &:first-child {
      border: none;
    }
  }
  .infoList-main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .infoList-title {
    box-sizing: border-box;
    min-width: 160px;
  }
  .infoList-content {
    padding: 0 10px;
  }
  .infoList-action {
    justify-self: end;
  }

  @include mobile {
    .infoList-item {
      height: auto;
      padding: 12px 0;
      flex-direction: column;
    }
    .infoList-title {
      width: 100%;
    }
    .infoList-main {
      align-items: flex-end;
    }
    .infoList-content {
      padding-left: 0;
    }
  }
}
.avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--primary-color);

  > p {
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 500;
    color: var(--secondary-variants-color);
  }

  @include mobile {
    width: 40px;
    height: 40px;

    > p {
      font-size: 18px;
      line-height: 20px;
    }
  }
}
</style>
