<template>
  <Container>
    <Heading :title="t('get_in_touch.title')" />
    <div class="wrap">
      <div class="sendMessage">
        <form class="p-input-filled" @submit.prevent="handleSubmit">
          <div class="form-label-group p-float-label p-field">
            <InputText
              id="email"
              v-model="getInTouch.email"
              type="email"
              name="email"
              placeholder=""
              class="form-control"
            />
            <small v-show="showEmailError" id="email-help" class="p-error">
              {{ 'Email is empty.' }}
            </small>
            <label class="input-label" for="email">
              {{ t('get_in_touch.lable.email') }}
            </label>
          </div>
          <div class="form-label-group p-float-label p-field">
            <InputText
              id="username2"
              v-model="getInTouch.name"
              type="text"
              name="name"
              placeholder=""
              class="form-control"
            />
            <small v-show="showNameError" id="username2-help" class="p-error">
              {{ 'Email is empty.' }}
            </small>
            <label for="name">{{ t('get_in_touch.lable.name') }}</label>
          </div>
          <div class="form-label-group p-float-label p-field">
            <InputText
              v-model="getInTouch.subject"
              type="text"
              name="subject"
              placeholder=""
              class="form-control"
            />
            <small
              v-show="showSubjectError"
              id="username2-help"
              class="p-error"
            >
              {{ 'Subject is empty.' }}
            </small>
            <label for="subject">{{ t('get_in_touch.lable.subject') }}</label>
          </div>
          <div
            class="
              form-label-group form-label-group-textarea
              p-float-label p-field
            "
          >
            <Textarea v-model="getInTouch.message" type="text" name="message" />
            <small
              v-show="showMessageError"
              id="username2-help"
              class="p-error"
            >
              {{ 'Message is empty.' }}
            </small>
            <label class="message-label" for="message">
              {{ t('get_in_touch.lable.message') }}
            </label>
          </div>
        </form>
        <div class="buttonBox">
          <Button :disabled="notSendable">{{ t('common.send') }}</Button>
        </div>
      </div>
      <div class="information">
        <div class="information-group email">
          <div class="information-theme">
            <p class="information-name">
              {{ t('get_in_touch.information.email.title') }}
            </p>
            <IconBase
              class="icon-group"
              :width="30"
              :height="30"
              viewBox="0 0 24 24"
              icon-color="#C1A14E"
            >
              <IconMail />
            </IconBase>
          </div>
          <div class="information-content">
            {{ t('get_in_touch.information.email.content') }}
          </div>
          <p class="information-description">
            {{ t('get_in_touch.information.email.description') }}
          </p>
        </div>
        <div class="information-group chat">
          <div class="information-theme">
            <p class="information-name">
              {{ t('get_in_touch.information.chat.title') }}
            </p>
            <IconBase
              class="icon-group"
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              icon-color="#C1A14E"
            >
              <IconChat />
            </IconBase>
          </div>
          <div class="information-content">
            {{ t('get_in_touch.information.chat.content') }}
          </div>
          <p class="information-description">
            {{ t('get_in_touch.information.chat.description') }}
          </p>
        </div>
        <div class="information-group faq">
          <div class="information-theme">
            <p class="information-name">
              {{ t('get_in_touch.information.faq.title') }}
            </p>
            <IconBase
              class="icon-group"
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              icon-color="#C1A14E"
            >
              <IconFAQ />
            </IconBase>
          </div>
          <div class="information-content">
            {{ t('get_in_touch.information.faq.content') }}
          </div>
          <p class="information-description">
            {{ t('get_in_touch.information.faq.description') }}
          </p>
        </div>
      </div>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { sendGetInTouch } from '@/modules/getInTouch/infrastructure/getInTouch.api';
import Container from '@/layout/Container.vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconChat from '@/components/icons/Chat_24.vue';
import IconFAQ from '@/components/icons/FAQ_24.vue';
import Heading from '@/components/Heading.vue';
import Button from '@/components/Button.vue';

// use i18n
const { t } = useI18n();

const getInTouch = reactive({
  email: '',
  name: '',
  subject: '',
  message: '',
});

const notSendable = computed(
  () =>
    getInTouch.email === '' ||
    getInTouch.name === '' ||
    getInTouch.subject === '' ||
    getInTouch.message === ''
);
const showEmailError = ref(false);
const showNameError = ref(false);
const showSubjectError = ref(false);
const showMessageError = ref(false);

function handleSubmit() {
  if (
    !(
      !getInTouch.name ||
      !getInTouch.email ||
      !getInTouch.subject ||
      !getInTouch.message
    )
  ) {
    sendGetInTouch(getInTouch);
    getInTouch.email = '';
    getInTouch.name = '';
    getInTouch.subject = '';
    getInTouch.message = '';
  }
}
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints.scss';

.wrap {
  display: flex;

  @include tablet-v {
    flex-direction: column;
  }

  @include mobile {
    flex-direction: column;
  }
}
.sendMessage {
  box-sizing: border-box;
  width: 100%;
  padding-right: 40px;

  @include tablet-v {
    padding-right: 0;
  }
  @include mobile {
    padding-right: 0;
  }
}

.information {
  @include tablet-v {
    display: flex;
    margin-top: 32px;
  }
  @include mobile {
    flex-direction: column;
    margin-top: 16px;
  }
}

.information-group {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 250px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background-color: var(--secondary-variants-color);
  // cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
  .information-theme {
    display: flex;
    justify-content: space-between;
  }
  .information-name {
    height: 28px;
    font-size: 26px;
    line-height: 26px;
  }
  .information-content {
    height: 100%;
    margin-top: 24px;
    font-weight: 400;
    color: var(--text-secondary);
  }
  .information-description {
    margin-top: 24px;
    color: var(--primary-color);
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
  }

  @include tablet-v {
    height: 260px;
    padding: 16px;
    margin-right: 16px;
    margin-bottom: 0;

    &:last-child {
      margin-bottom: 0;
      margin-right: 0;
    }
  }
  @include mobile {
    height: 158px;
    padding: 16px;
    margin-right: 0;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
      margin-right: 0;
    }

    .information-content {
      margin-top: 8px;
    }

    .information-name {
      font-size: 16px;
      line-height: 20px;
    }
    .information-description {
      margin-top: 8px;
      font-size: 14px;
      line-height: 22px;
    }
  }
}
.form-label-group {
  width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-label-group-textarea {
  height: 516px;
  .p-inputtextarea {
    height: 100%;
    resize: none;
  }

  @include tablet-v {
    height: 400px;
  }

  @include mobile {
    height: 200px;
  }
}

.buttonBox {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

// .form-label-message {
//   // height: 512px;
// }

.p-float-label textarea:focus ~ label {
  color: var(--primary-color);
}
</style>
