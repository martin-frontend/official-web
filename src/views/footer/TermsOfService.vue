<template>
  <Container>
    <section>
      <OutlineCard>
        <div class="termsCard">
          <div class="termsCard__block">
            <div class="termsCard__title">{{ 'Terms of Service' }}</div>
            <div class="termsCard__content">
              <ul class="termsList">
                <li class="termsList__item">
                  {{
                    '1.2 By using and/or visiting any section of the Website, or by opening an account with the Operator through the Website, You agree to be bound by the Terms of Use and You accordingly: (a) agree to the use of electronic communications in order to enter into contracts; and (b) waive any applicable rights or requirements which require a signature by hand, to the extent permitted by any applicable law; (c) agree, that in order to use our service you are requested to provide us with certain personal information which shall be processed on the basis of our Privacy Policy. The Terms of Use do not affect your statutory rights. '
                  }}
                </li>
                <li class="termsList__item">
                  {{
                    '1.3 In addition, where You play any game, or place a bet using the Services, or otherwise use the Services, You agree to be bound by Rules of any game You play (“Game Rules”), as set out under the relevant general Help section and any Rules tabs, in respect of any new games, the rules applicable to such game; any Bonus Terms; any terms and conditions relating to withdrawals and any other terms applicable to the Services and/or which You are required to confirm Your agreement to as part of the Services. '
                  }}
                </li>
                <li class="termsList__item">
                  {{
                    '1.4 The original text of the Terms of Use are in English and any interpretation of them will be based on the original English text. If the Terms of Use or any documents or notices related to them are translated into any other language, the original English version will prevail. '
                  }}
                </li>
                <li class="termsList__item">
                  {{
                    '1.5 Please read the Terms of Use carefully before accepting them. Once You have accepted the Terms of Use, please print the Terms of Use and store them, along with all confirmation emails, additional terms, transaction data, game rules, fair deal rules and payment methods relevant to Your use of the Website. Please note that the Terms of Use are subject to change, as set out in paragraph 3 below. '
                  }}
                </li>
                <li class="termsList__item">
                  {{
                    '1.6 If You do not agree to accept and be bound by the Terms of Use please do not open an account, and/or continue to use Your Account. Your continued use of any of the Services will constitute acceptance of the Terms of Use which we have notified You are in force from time to time. '
                  }}
                </li>
                <li class="termsList__item">
                  {{
                    '1.7 For the avoidance of doubt, each and all sections of the Website are governed by the Terms of Use, and You should ensure at all times that Your use of the Services is in accordance with the Terms of Use. '
                  }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </OutlineCard>
    </section>
  </Container>
</template>

<script lang="ts" setup>
import Container from '@/layout/Container.vue';
import OutlineCard from '@/components/OutlineCard.vue';
</script>

<style lang="scss" scoped>
.termsCard {
  box-sizing: border-box;
  max-width: 1280px;
  padding: 32px 40px;
  line-height: 20px;
  background-color: #323232;

  &__title {
    font-size: 26px;
    line-height: 26px;
    color: var(--primary-color);
  }

  &__content {
    margin-top: 32px;
  }
}

.termsList {
  color: #9e9e9e;
  &__item {
    text-align: justify;
    & + & {
      margin-top: 20px;
    }
  }

  &--dot {
    list-style: disc;
    padding-left: 24px;
    margin-top: 20px;
  }
}

.termLink {
  color: #99c2ec;
  text-decoration: underline;
}
</style>
