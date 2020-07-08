<template>
  <div class="footer">
    <div class="text-center">
      <ul class="inline-list">
        <li class="item">
          © Copyrights
        </li>
        <li class="item">
          All rights reserved
        </li>
      </ul>
      <ul class="inline-list">
        <li class="item">
          <router-link to="/page" class="link">Imprint</router-link>
        </li>
        <li class="item">
          <router-link to="/page" class="link">Terms of use</router-link>
        </li>
        <li class="item">
          <router-link to="/page" class="link">Privacy policy</router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {

}
</script>


<style lang="scss">
.footer {

  padding: 10px 0 11px 0;

  background: #001C7B;
  color: #fff;

  .text-center {
    text-align: center;

    .inline-list {
      display: inline-block;
      list-style-type: none;
      padding: 0;
      margin: 0;

      & + .inline-list {
        .item {
          &:last-child {
            &:after {
              display: none;
            }
          }
        }
      }

      .item {
        display: inline-block;
        margin-right: 10px;
        padding: 0 10px 0 0;
        position: relative;

        font-size: 12px;
        font-family: "Roboto-Regular", sans-serif;
        line-height: 1.2;

        .link {
          color: #fff;
          text-decoration: none;
        }

        &:last-child {
          &:after {
            @media only screen and (max-width: 480px) {
              display: none;
            }
          }
        }

        &:after {
          content: '';

          width: 1px;
          height: 100%;

          display: inline-block;

          position: absolute;
          top: 0;
          right: 0;
          background: #fff;
        }
      }
    }

  }
}
</style>
