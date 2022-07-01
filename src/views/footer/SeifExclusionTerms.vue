<template>
  <Container>
    <section>
      <OutlineCard>
        <div class="termsCard">
          <div class="termsCard__block">
            <div class="termsCard__title">
              {{ 'Self-Exclusion terms' }}
            </div>
            <div class="termsCard__content">
              <ul class="termsList">
                <li class="termsList__item">
                  <span>
                    {{
                      '21.1 Your access to and use of the Services is at Your sole option, discretion and risk. We shall not be liable for any attempts by You to use the Services by methods, means or ways not intended by us.'
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '21.2 We will provide the Services with reasonable skill and care and substantially as described in the Terms of Use. We do not make any other promises or warranties regarding the Services, or any products or services forming a part of the Services, and hereby exclude (to the extent permitted by law) all implied warranties in respect of the same (including implied warranties as to satisfactory quality and/or fitness for Your purpose). In particular, we do not warrant that the Website will have uninterrupted availability or that it will be free of bugs, viruses or other errors.'
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '21.3 WE (INCLUDING OUR GROUP COMPANIES, PAYMENT PROCESSOR, AFFILIATES, OFFICERS, DIRECTORS, AGENTS AND EMPLOYEES) SHALL NOT BE LIABLE TO YOU, WHETHER SUCH LIABILITY ARISES IN CONTRACT, TORT (INCLUDING NEGLIGENCE) OR OTHERWISE, IN RESPECT OF ANY: '
                    }}
                  </span>
                  <ul class="termsList termsList--dot">
                    <li class="termsList__item">
                      {{ '21.3.1 LOSS OF DATA;' }}
                    </li>
                    <li>
                      {{ '21.3.2 LOSS OF PROFITS;' }}
                    </li>
                    <li>
                      {{ '21.3.3 LOSS OF REVENUE;' }}
                    </li>
                    <li>
                      {{ '21.3.4 LOSS OF BUSINESS OPPORTUNITY;' }}
                    </li>
                    <li>
                      {{
                        '21.3.5 LOSS OF OR DAMAGE TO GOODWILL OR REPUTATION;'
                      }}
                    </li>
                    <li>
                      {{ '21.3.6 BUSINESS INTERRUPTION; OR' }}
                    </li>
                    <li>
                      {{
                        '21.3.7 ANY INDIRECT, SPECIAL OR CONSEQUENTIAL LOSS OR DAMAGE, EVEN WHERE SUCH LOSS OR DAMAGE HAS BEEN NOTIFIED TO US AS BEING POSSIBLE, ARISING OUT OF THE TERMS OF USE OR ANY USE WHATSOEVER BY YOU OF THE SERVICES.'
                      }}
                    </li>
                  </ul>
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
