<template>
    <div class="players-count">
        {{ players }} Players Online
    </div>
</template>

<script>
export default {
  name: 'PlayersCount',
  props: ['players']
}
</script>