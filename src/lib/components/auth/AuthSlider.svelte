<script>
    import { slide } from 'svelte/transition';
    export let child; // login or register component
</script>

<div class="slider-container">
    <div in:slide={{ x: 300, duration: 300 }} out:slide={{ x: -300, duration: 300 }}>
        <svelte:component this={child} />
    </div>
</div>

<style>
    .slider-container {
        position: relative;
        width: 400px;
        overflow: hidden;
        margin: auto;
    }
    .slider-container > div {
        position: absolute;
        width: 100%;
    }
</style>
