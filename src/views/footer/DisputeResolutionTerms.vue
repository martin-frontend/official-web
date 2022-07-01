<template>
  <Container>
    <section>
      <OutlineCard>
        <div class="termsCard">
          <div class="termsCard__block">
            <div class="termsCard__title">
              {{ 'Dispute Resolution terms' }}
            </div>
            <div class="termsCard__content">
              <ul class="termsList">
                <li class="termsList__item">
                  <span>
                    {{
                      '22.1 You will fully indemnify, defend and hold us and our officers, directors, employees, agents, contractors and suppliers harmless from and against any and all losses, costs, expenses, claims, demands, liabilities and damages (including legal fees), however caused, that may arise, whether or not reasonably foreseeable, as a result of or in connection with:'
                    }}
                  </span>
                  <ul class="termsList termsList--dot">
                    <li class="termsList__item">
                      {{
                        '22.1.1 the access to and use of the Services by You or by anyone else using Your username and password; and/or '
                      }}
                    </li>
                    <li>
                      {{
                        '22.1.2 any breach by You of any of the terms and provisions of the Terms of Use. '
                      }}
                    </li>
                  </ul>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '22.2 Where You are in breach of the Terms of Use, we may at our sole discretion, prior to any suspension or termination of Your Account, notify You (using Your Contact Details) that You are in breach, requiring You to stop the relevant act or failure to act, and/or requiring You to put right an act or fault on Your part and warning You of our intended action if You do not do so, provided always that such notification shall not be a pre-condition to any suspension or termination of Your Account.'
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '22.3 We have the right to disable any user identification code or password, whether chosen by You or allocated by us, at any time, if in our reasonable opinion You have failed to comply with any of the provisions of the Terms of Use. '
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '22.4 In addition to any other remedy available, if You breach any of the Terms of Use we shall be entitled to recover from Your Account any positive balance to the extent of any amount reasonably claimed against You pursuant to paragraph 21.1. '
                    }}
                  </span>
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
