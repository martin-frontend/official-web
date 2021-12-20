<template>
  <Container>
    <Heading
      :title="t('kyc_verified.title')"
      :define="t('kyc_verified.define')"
    />
    <!-- Step1 - Proof of identification -->
    <section class="step-wrap">
      <VerificationStepTitle
        :title="t('common.step')"
        :define="t('kyc_verified.steps[0].title')"
        :step="1"
      />
      <div class="step-content">
        <div class="verification-wrap-3col">
          <!-- ----  Identity  ---- -->
          <div class="verification-wrap-item">
            <!-- verifying -->
            <div
              v-if="
                kycLevelData.level === 1 && kycLevelData.status === 'PENDING'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.identity.title') }}</p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconHistory />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[0]') }}
                </Text>
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[1]') }}
                </Text>
              </div>
            </div>
            <!-- approved -->
            <div
              v-else-if="
                kycLevelData.level === 2 ||
                (kycLevelData.level === 1 && kycLevelData.status === 'PASS')
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.identity.title') }}</p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconCheckedRounded />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.approved') }}
                </Text>
              </div>
            </div>
            <!-- rejected -->
            <div
              v-else-if="
                kycLevelData.level === 1 && kycLevelData.status === 'REJECT'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.identity.title') }}</p>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.rejected') }}
                </Text>
              </div>
              <div class="verification-card-content">
                <label
                  v-if="toUploadIdentity.showingDefault"
                  for="identities_rejected"
                >
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="identities_rejected"
                      class="upload-block-input"
                      type="file"
                      name="identities_rejected"
                      accept="image/png,
                image/jpg,.pdf"
                      @change="uploadingIdentity($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div
                  v-if="toUploadIdentity.showingPreview"
                  class="upload-block"
                >
                  <div
                    class="upload-block-remove"
                    @click="removeSingleUploading('identity')"
                  >
                    <IconBase
                      :width="24"
                      :height="24"
                      icon-color="#fff"
                      viewBox="2 2 24 24"
                    >
                      <IconClose />
                    </IconBase>
                  </div>
                  <img :src="toUploadIdentity.url" alt="" />
                </div>
              </div>
            </div>
            <!-- default -->
            <div v-else class="verification-card">
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.identity.title') }}</p>
              </div>
              <div class="verification-card-depiction">
                {{ t('kyc_verified.steps[0].content.identity.depiction') }}
              </div>
              <div class="verification-card-content">
                <!-- before upload -->
                <label v-if="toUploadIdentity.showingDefault" for="identities">
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="identities"
                      class="upload-block-input"
                      type="file"
                      name="identities"
                      accept="image/png,
                image/jpg,.pdf"
                      @change="uploadingIdentity($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div
                  v-if="toUploadIdentity.showingPreview"
                  class="upload-block"
                >
                  <div
                    class="upload-block-remove"
                    @click="removeSingleUploading('identity')"
                  >
                    <IconBase
                      :width="24"
                      :height="24"
                      icon-color="#fff"
                      viewBox="2 2 24 24"
                    >
                      <IconClose />
                    </IconBase>
                  </div>
                  <img :src="toUploadIdentity.url" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- ----  Identity Back  ---- -->
          <div class="verification-wrap-item">
            <!-- verifying -->
            <div
              v-if="
                kycLevelData.level === 1 && kycLevelData.status === 'PENDING'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.identity.title') }}</p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconHistory />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[0]') }}
                </Text>
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[1]') }}
                </Text>
              </div>
            </div>
            <!-- approved -->
            <div
              v-else-if="
                kycLevelData.level === 2 ||
                (kycLevelData.level === 1 && kycLevelData.status === 'PASS')
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>
                  {{ t('kyc_verified.steps[0].content.identity_back.title') }}
                </p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconCheckedRounded />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.approved') }}
                </Text>
              </div>
            </div>
            <!-- rejected -->
            <div
              v-else-if="
                kycLevelData.level === 1 && kycLevelData.status === 'REJECT'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>
                  {{ t('kyc_verified.steps[0].content.identity_back.title') }}
                </p>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.rejected') }}
                </Text>
              </div>
              <div class="verification-card-content">
                <label
                  v-if="toUploadIdentityBack.showingDefault"
                  for="identitiesBack_rejected"
                >
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="identitiesBack_rejected"
                      class="upload-block-input"
                      type="file"
                      name="identitiesBack_rejected"
                      accept="image/png,
                image/jpg,.pdf"
                      @change="uploadingIdentityBack($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div
                  v-if="toUploadIdentityBack.showingPreview"
                  class="upload-block"
                >
                  <div
                    class="upload-block-remove"
                    @click="removeSingleUploading('identityBack')"
                  >
                    <IconBase
                      :width="24"
                      :height="24"
                      icon-color="#fff"
                      viewBox="2 2 24 24"
                    >
                      <IconClose />
                    </IconBase>
                  </div>
                  <img :src="toUploadIdentityBack.url" alt="" />
                </div>
              </div>
            </div>
            <!-- default -->
            <div v-else class="verification-card">
              <div class="verification-card-title">
                <p>
                  {{ t('kyc_verified.steps[0].content.identity_back.title') }}
                </p>
              </div>
              <div class="verification-card-depiction">
                {{ t('kyc_verified.steps[0].content.identity_back.depiction') }}
              </div>
              <div class="verification-card-content">
                <!-- before upload -->
                <label
                  v-if="toUploadIdentityBack.showingDefault"
                  for="identitiesBack"
                >
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="identitiesBack"
                      class="upload-block-input"
                      type="file"
                      name="identities"
                      accept="image/png,
                image/jpg,.pdf"
                      @change="uploadingIdentityBack($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div
                  v-if="toUploadIdentityBack.showingPreview"
                  class="upload-block"
                >
                  <div
                    class="upload-block-remove"
                    @click="removeSingleUploading('identityBack')"
                  >
                    <IconBase
                      :width="24"
                      :height="24"
                      icon-color="#fff"
                      viewBox="2 2 24 24"
                    >
                      <IconClose />
                    </IconBase>
                  </div>
                  <img :src="toUploadIdentityBack.url" alt="" />
                </div>
              </div>
            </div>
          </div>
          <!-- ----  Selfie&ID  ---- -->
          <div class="verification-wrap-item">
            <!-- verifying -->
            <div
              v-if="
                kycLevelData.level === 1 && kycLevelData.status === 'PENDING'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.selfie_id.title') }}</p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconHistory />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[0]') }}
                </Text>
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[1]') }}
                </Text>
              </div>
            </div>
            <!-- approved -->
            <div
              v-else-if="
                kycLevelData.level === 2 ||
                (kycLevelData.level === 1 && kycLevelData.status === 'PASS')
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.selfie_id.title') }}</p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconCheckedRounded />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.approved') }}
                </Text>
              </div>
            </div>
            <!-- rejected -->
            <div
              v-else-if="
                kycLevelData.level === 1 && kycLevelData.status === 'REJECT'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.selfie_id.title') }}</p>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.rejected') }}
                </Text>
              </div>
              <div class="verification-card-content">
                <label
                  v-if="toUploadSelfie.showingDefault"
                  for="selfie_rejected"
                >
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="selfie_rejected"
                      class="upload-block-input"
                      type="file"
                      name="selfie_rejected"
                      accept="image/png,
                image/jpg,.pdf"
                      @change="uploadingSelfie($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div v-if="toUploadSelfie.showingPreview" class="upload-block">
                  <div
                    class="upload-block-remove"
                    @click="removeSingleUploading('selfie')"
                  >
                    <IconBase
                      :width="24"
                      :height="24"
                      icon-color="#fff"
                      viewBox="2 2 24 24"
                    >
                      <IconClose />
                    </IconBase>
                  </div>
                  <img :src="toUploadSelfie.url" alt="" />
                </div>
              </div>
            </div>
            <!-- default -->
            <div v-else class="verification-card">
              <div class="verification-card-title">
                <p>
                  {{ t('kyc_verified.steps[0].content.selfie_id.title') }}
                </p>
              </div>
              <div class="verification-card-depiction">
                {{ t('kyc_verified.steps[0].content.selfie_id.depiction') }}
              </div>
              <div class="verification-card-content">
                <!-- before upload -->
                <label v-if="toUploadSelfie.showingDefault" for="selfie">
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="selfie"
                      class="upload-block-input"
                      type="file"
                      name="selfie"
                      accept="image/png, image/jpg,.pdf"
                      @change="uploadingSelfie($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div v-if="toUploadSelfie.showingPreview" class="upload-block">
                  <div
                    class="upload-block-remove"
                    @click="removeSingleUploading('selfie')"
                  >
                    <IconBase
                      :width="24"
                      :height="24"
                      icon-color="#fff"
                      viewBox="2 2 24 24"
                    >
                      <IconClose />
                    </IconBase>
                  </div>
                  <img :src="toUploadSelfie.url" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          kycLevelData.level === 0 ||
          (kycLevelData.level === 1 && kycLevelData.status === 'REJECT')
        "
        class="step-actions"
      >
        <div class="buttons-wrap">
          <div class="buttons-wrap-item">
            <Button
              v-if="
                toUploadIdentity.file !== null && toUploadSelfie.file !== null
              "
              component="button"
              color="primary"
              @click="uploadFirstKyc"
            >
              {{ t('common.submit') }}
            </Button>
            <Button v-else component="button" color="disabled">
              {{ t('common.submit') }}
            </Button>
          </div>
          <div class="buttons-wrap-item">
            <Button
              v-if="
                toUploadIdentity.file !== null ||
                toUploadIdentityBack.file !== null ||
                toUploadSelfie.file !== null
              "
              component="button"
              variant="outlined"
              @click="resetUploading"
            >
              {{ t('common.reset') }}
            </Button>
            <Button v-else component="button" color="disabled">
              {{ t('common.reset') }}
            </Button>
          </div>
        </div>
      </div>
    </section>
    <!-- Step2 - Proof of Adress -->
    <section class="step-wrap">
      <VerificationStepTitle
        :title="t('common.step')"
        :define="t('kyc_verified.steps[1].title')"
        :step="2"
      />
      <div class="step-content">
        <div class="verification-wrap">
          <div class="verification-wrap-item">
            <!-- Default -->
            <div
              v-if="
                kycLevelData.level === 0 ||
                (kycLevelData.level === 1 &&
                  kycLevelData.status === 'PENDING') ||
                (kycLevelData.level === 1 && kycLevelData.status === 'REJECT')
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[1].content.address.title') }}</p>
              </div>
              <div class="verification-card-depiction">
                {{ t('kyc_verified.steps[1].content.address.depiction') }}
              </div>
              <div class="verification-card-content" />
            </div>
            <!-- Upload address -->
            <div
              v-if="kycLevelData.level === 1 && kycLevelData.status === 'PASS'"
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[1].content.address.title') }}</p>
              </div>
              <div class="verification-card-depiction">
                {{ t('kyc_verified.steps[1].content.address.depiction') }}
              </div>
              <div class="verification-card-content">
                <label v-if="toUploadAddress.showingDefault" for="address">
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="address"
                      class="upload-block-input"
                      type="file"
                      name="address"
                      accept="image/png,
                image/jpg,.pdf"
                      @change="uploadingAddress($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div v-if="toUploadAddress.showingPreview" class="upload-block">
                  <img :src="toUploadAddress.url" alt="" />
                </div>
              </div>
            </div>
            <!-- verifying -->
            <div
              v-if="
                kycLevelData.level === 2 && kycLevelData.status === 'PENDING'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[1].content.address.title') }}</p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconHistory />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[0]') }}
                </Text>
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.verifying[1]') }}
                </Text>
              </div>
            </div>
            <!-- approved -->
            <div
              v-else-if="
                kycLevelData.level === 2 && kycLevelData.status === 'PASS'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[1].content.address.title') }}</p>
              </div>
              <div class="verification-card-logo">
                <IconBase :width="48" :height="48" viewBox="0 0 48 48">
                  <IconCheckedRounded />
                </IconBase>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.approved') }}
                </Text>
              </div>
            </div>
            <!-- rejected -->
            <div
              v-else-if="
                kycLevelData.level === 2 && kycLevelData.status === 'REJECT'
              "
              class="verification-card"
            >
              <div class="verification-card-title">
                <p>{{ t('kyc_verified.steps[0].content.identity.title') }}</p>
              </div>
              <div class="verification-card-depiction">
                <Text color="secondary" size="sm">
                  {{ t('kyc_verified.rejected') }}
                </Text>
              </div>
              <div class="verification-card-content">
                <label
                  v-if="toUploadAddress.showingDefault"
                  for="address_rejected"
                >
                  <div class="upload-block">
                    <div class="upload-block-title">
                      {{ t('kyc_verified.upload.title') }}
                    </div>
                    <div class="upload-block-icon">
                      <IconBase>
                        {{ 'icon 待補' }}
                      </IconBase>
                    </div>
                    <div class="upload-block-define">
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.define') }}
                      </Text>
                      <Text component="div" size="tiny" color="secondary">
                        {{ t('kyc_verified.upload.max_size') }}
                      </Text>
                    </div>
                    <input
                      id="address_rejected"
                      class="upload-block-input"
                      type="file"
                      name="address_rejected"
                      accept="image/png,
                image/jpg,.pdf"
                      @change="uploadingAddress($event)"
                    />
                  </div>
                </label>
                <!-- image preview -->
                <div v-if="toUploadAddress.showingPreview" class="upload-block">
                  <img :src="toUploadAddress.url" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          (kycLevelData.level === 1 && kycLevelData.status === 'PASS') ||
          (kycLevelData.level === 2 && kycLevelData.status === 'REJECT')
        "
        class="step-actions"
      >
        <div class="buttons-wrap">
          <div class="buttons-wrap-item">
            <Button
              v-if="toUploadAddress.file === null"
              component="button"
              color="disabled"
            >
              {{ t('common.submit') }}
            </Button>
            <Button
              v-else
              component="button"
              color="primary"
              @click="uploadSecondKyc"
            >
              {{ t('common.submit') }}
            </Button>
          </div>
          <div class="buttons-wrap-item">
            <Button
              v-if="toUploadAddress.file === null"
              component="button"
              color="disabled"
            >
              {{ t('common.reset') }}
            </Button>
            <Button
              v-else
              component="button"
              variant="outlined"
              @click="resetUploading"
            >
              {{ t('common.reset') }}
            </Button>
          </div>
        </div>
      </div>
    </section>
  </Container>
  <!-- Dialog -->
  <VerifiedDialog v-model:visible="displayModal" @close="close" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  getPlayerKyc,
  uploadPlayerKycL1,
  uploadPlayerKycL2,
} from '@/modules/user/Infrastructure/api/kyc.api';
// import { PlayerKyc } from '@/modules/user/domain/user.kyc';
import Container from '@/layout/Container.vue';
import Button from '@/components/Button.vue';
import Heading from '@/components/Heading.vue';
import Text from '@/components/Typography.vue';
import IconBase from '@/components/icons/IconBase.vue';
import VerificationStepTitle from '@/modules/user/ui/VerificationStepTitle.vue';
import VerifiedDialog from '@/modules/user/ui/VerifiedDialog.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconHistory from '@/components/icons/IconHistory.vue';
import IconCheckedRounded from '@/components/icons/IconCheckedRounded.vue';

const { t } = useI18n();
// confirm dialog
const displayModal = ref(false);
function close() {
  displayModal.value = false;
}
// setting user's states
const kycLevelData = ref({
  level: 0,
  status: '',
});

const defaultFile = {
  file: null as File | null,
  url: '',
  showingDefault: true,
  showingPreview: false,
};

const toUploadIdentity = ref(defaultFile);

const toUploadIdentityBack = ref(defaultFile);

const toUploadSelfie = ref(defaultFile);

const toUploadAddress = ref(defaultFile);

function uploadingIdentity(event: Event) {
  const file = ((event.target as HTMLInputElement).files || [])[0];

  toUploadIdentity.value = {
    file,
    url: URL.createObjectURL(file),
    showingDefault: false,
    showingPreview: true,
  };
}
function uploadingIdentityBack(event: Event) {
  const file = ((event.target as HTMLInputElement).files || [])[0];

  toUploadIdentityBack.value = {
    file,
    url: URL.createObjectURL(file),
    showingDefault: false,
    showingPreview: true,
  };
}
function uploadingSelfie(event: Event) {
  const file = ((event.target as HTMLInputElement).files || [])[0];

  toUploadSelfie.value = {
    file,
    url: URL.createObjectURL(file),
    showingDefault: false,
    showingPreview: true,
  };
}
function uploadingAddress(event: Event) {
  const file = ((event.target as HTMLInputElement).files || [])[0];

  toUploadAddress.value = {
    file,
    url: URL.createObjectURL(file),
    showingDefault: false,
    showingPreview: true,
  };
}

// remove single file
function removeSingleUploading(kind: string) {
  if (kind === 'identity') {
    toUploadIdentity.value = defaultFile;
  } else if (kind === 'identityBack') {
    toUploadIdentityBack.value = defaultFile;
  } else if (kind === 'selfie') {
    toUploadSelfie.value = defaultFile;
  }
}

// reset
function resetUploading() {
  toUploadIdentity.value = defaultFile;
  toUploadIdentityBack.value = defaultFile;
  toUploadSelfie.value = defaultFile;
  toUploadAddress.value = defaultFile;
}

// first step upload
async function uploadFirstKyc() {
  const files = {
    identityFront: toUploadIdentity.value.file,
    identityBack: toUploadIdentityBack.value.file,
    selfie: toUploadSelfie.value.file,
  };
  try {
    await uploadPlayerKycL1(files);
    displayModal.value = true;
    toUploadIdentity.value.file = null;
    toUploadIdentityBack.value.file = null;
    toUploadSelfie.value.file = null;
    getPlayerKyc()
      .then((data) => data)
      .then((data) => {
        kycLevelData.value = data;
      });
  } catch (error) {
    console.log(error);
  }
}

// second step upload
async function uploadSecondKyc() {
  const files = {
    address: toUploadAddress.value.file,
  };
  try {
    await uploadPlayerKycL2(files);
    displayModal.value = true;
    toUploadAddress.value.file = null;
    getPlayerKyc()
      .then((data) => data)
      .then((data) => {
        kycLevelData.value = data;
      });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getPlayerKyc()
    .then((data) => data)
    .then((data) => {
      kycLevelData.value = data;
    });
});
</script>

<i18n locale="en" src="@/core/locales/en.json"></i18n>

<style lang="scss" scoped>
@import '@/styles/breakpoints';

.step-wrap {
  & + & {
    margin-top: 24px;
  }
}
.step-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;

  @include mobile() {
    margin-top: 16px;
    justify-content: center;
  }
}
.verification-wrap {
  &-3col {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }

  &-3col & {
    &-item {
      width: 33.33%;
      padding: 0 8px;
    }
  }

  @include tablet-v() {
    &-3col & {
      &-item {
        width: 50%;
        margin-bottom: 16px;

        &::last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  @include mobile() {
    &-3col & {
      &-item {
        width: 100%;
        margin-bottom: 16px;

        &::last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
.verification-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  border: 1px solid var(--primary-color);
  box-sizing: border-box;
  border-radius: 5px;
  background: var(--secondary-variants-color);

  @include mobile() {
    min-height: 308px;
    padding: 20px;
  }

  .verification-card-title {
    font-size: 22px;
    font-weight: 500;
    line-height: 24px;
    color: var(--primary-color);
    @include mobile() {
      font-size: 16px;
      line-height: 20px;
    }
  }

  .verification-card-depiction {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 110px;
    // margin: 16px 0;
    font-size: 14px;
    line-height: 22px;
    text-align: center;

    @include mobile() {
      height: 64px;
      margin-top: 8px;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .verification-card-logo {
    margin-top: 16px;
  }
  .verification-card-content {
    width: auto;
    margin-top: 16px;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-secondary);
    @include mobile() {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
.upload-block {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 180px;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  background: var(--secondary-color);
  border: 1px dashed var(--primary-color);
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-block-remove {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  .upload-block-title {
    font-size: 16px;
    line-height: 20px;
    color: var(--text-primary);
  }

  .upload-block-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  @include tablet-h() {
    width: 264px;
    height: 160px;
  }
  @include tablet-v() {
    width: 264px;
    height: 160px;
  }
  @include mobile() {
    width: 264px;
    height: 160px;
  }
}
.buttons-wrap {
  display: flex;

  &-item {
    & + & {
      margin-left: 10px;
    }
  }

  @include mobile {
    margin-top: 10px;

    &-item {
      width: 100%;
      & + & {
        margin-left: 8px;
      }
    }
  }
}
</style>
