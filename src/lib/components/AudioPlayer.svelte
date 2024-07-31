<script lang="ts">
	import { Loader, Play, Pause, Volume2, VolumeX } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let src = '';

	let playerState = 'loading';
	let duration = 0;
	let durationMS = '0:00';
	let currentTimeMS = '0:00';
	let lastVolume = 0.5;
	let muted = false;
	let afterSeek = false;
	let audio: HTMLAudioElement;
	let playbackSlider: HTMLInputElement;
	let volumeSlider: HTMLInputElement;
	let playbackSliderBeingManipulated = false;

	function convertTime(time: number): string {
		let minutes = Math.floor(time / 60);
		let seconds = Math.floor(time - minutes * 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		audio = new Audio();
		audio.src = src;
		audio.volume = lastVolume;

		audio.addEventListener('canplay', () => {
			if (!afterSeek) playerState = 'paused';
			duration = audio.duration;
			durationMS = convertTime(duration);
		});

		audio.addEventListener('seeking', () => {
			afterSeek = true;
			setTimeout(() => (afterSeek = false), 500);
		});

		audio.addEventListener('ended', () => {
			playerState = 'paused';
		});

		audio.addEventListener('playing', () => {
			playerState = 'playing';
		});

		audio.addEventListener('pause', () => {
			playerState = 'paused';
		});

		volumeSlider.addEventListener('change', () => {
			audio.volume = Number(volumeSlider.value) / 10;
		});

		audio.addEventListener('timeupdate', () => {
			if (!playbackSliderBeingManipulated) {
				playbackSlider.value = Math.floor((audio.currentTime / audio.duration) * 100) + '';
				currentTimeMS = convertTime((Number(playbackSlider.value) / 100) * duration);
			}
		});

		playbackSlider.addEventListener('change', () => {
			if (playbackSliderBeingManipulated)
				audio.currentTime = (Number(playbackSlider.value) / 100) * duration;

			currentTimeMS = convertTime((Number(playbackSlider.value) / 100) * duration);
		});

		playbackSlider.addEventListener('mousedown', () => {
			playbackSliderBeingManipulated = true;
		});

		playbackSlider.addEventListener('mouseup', () => {
			setTimeout(() => {
				playbackSliderBeingManipulated = false;
			}, 100);
		});
	});

	function mute() {
		if (muted) {
			audio.volume = lastVolume;
			volumeSlider.value = lastVolume * 10 + '';
			muted = false;
		} else {
			lastVolume = audio.volume;
			audio.volume = 0;
			volumeSlider.value = '0';
			muted = true;
		}
	}
</script>

<div class="w-full">
	<div class="flex gap-3 rounded-lg">
		{#if playerState === 'loading'}
			<Loader class="animate-spin"></Loader>
		{:else if playerState === 'paused'}
			<button class="group" on:click={() => audio.play()}>
				<Play class="group-hover:text-overlay1"></Play>
			</button>
		{:else if playerState === 'playing'}
			<button class="group" on:click={() => audio.pause()}>
				<Pause class="group-hover:text-overlay1"></Pause>
			</button>
		{/if}

		<input
			class="flex-grow my-auto"
			type="range"
			min="0"
			max="100"
			value="0"
			disabled={playerState === 'loading'}
			bind:this={playbackSlider}
		/>

		<div class="flex flex-row gap-1">
			<p>{currentTimeMS}</p>
			<p class="text-subtext0">/</p>
			<p class="text-subtext0">{durationMS}</p>
		</div>

		<div class="flex flex-row w-[20%] gap-1.5">
			<button class="group" on:click={mute}>
				{#if muted}
					<VolumeX class="group-hover:text-overlay1"></VolumeX>
				{:else}
					<Volume2 class="group-hover:text-overlay1"></Volume2>
				{/if}
			</button>
			<input
				class="my-auto w-full"
				type="range"
				min="0"
				max="10"
				value="5"
				disabled={muted}
				bind:this={volumeSlider}
			/>
		</div>
	</div>
</div>
