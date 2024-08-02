<script>
	import { Info, X, Plus } from 'lucide-svelte';
	import Button from '$lib/components/Inputs/Button.svelte';
	import ListedApiKey from '$lib/components/ListedAPIKey.svelte';

	export let data;
</script>

<div class="grid grid-cols-1 gap-2 mx-auto xl:grid-cols-3 w-fit">
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2 p-2 max-w-lg rounded-lg bg-crust">
			<p class="text-xl font-bold">Account Settings</p>
			<span class="w-full border-b-2 border-surface0" />
			<div class="flex flex-col gap-3">
				<div class="">
					<div class="flex flex-col gap-1">
						<label class="text-lg font-bold" for="username">Username</label>
						<input
							class="px-2 h-8 rounded-lg ring-1 transition-all bg-mantle ring-surface2 focus-visible:outline-none focus-visible:outline-overlay0"
							type="text"
							name="username"
							id="username"
							placeholder="cirro"
						/>
						<p class="text-sm text-surface2">
							Your username is used to identify you around the site. You can change it at any time.
						</p>
					</div>
				</div>
				<div class="mb-1">
					<div class="flex flex-col gap-1">
						<label class="text-lg font-bold" for="email">Email</label>
						<input
							class="px-2 h-8 rounded-lg ring-1 transition-all bg-mantle ring-surface2 focus-visible:outline-none focus-visible:outline-overlay0"
							type="email"
							name="email"
							id="email"
							placeholder="c*******@madhouselabs.net"
						/>
						<p class="text-sm text-surface2">
							Changing your email may require you to verify ownership.
						</p>
					</div>
				</div>
				<Button color={'bg-mantle'} click={() => {}}>
					<p class="w-full text-center">Update Account</p></Button
				>
			</div>
		</div>
		<div class="flex flex-col gap-2 p-2 max-w-lg rounded-lg bg-crust">
			<p class="flex text-xl font-bold">
				API Keys
				<button class="my-auto ml-auto hover:text-blue">
					<Plus></Plus>
				</button>
			</p>
			<span class="w-full border-b-2 border-surface0" />
			<table class="w-full text-left rounded-t-lg table-auto">
				<thead>
					<tr class="bg-mantle">
						<th>API Key</th>
						<th class="text-center">Revoke</th>
					</tr>
				</thead>
				<tbody>
					{#each data.keys as key}
						<ListedApiKey {key} />
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2 p-2 max-w-lg rounded-lg bg-crust">
			<p class="flex text-xl font-bold">
				Embed Settings
				<button class="my-auto ml-auto">
					<Info class="my-auto"></Info>
				</button>
			</p>
			<span class="w-full border-b-2 border-surface0" />
			<div class="flex flex-col gap-3">
				<div class="">
					<div class="flex flex-col gap-1">
						<label class="text-lg font-bold" for="title">Title</label>
						<input
							class="px-2 h-8 rounded-lg ring-1 transition-all bg-mantle ring-surface2 focus-visible:outline-none focus-visible:outline-overlay0"
							type="text"
							name="title"
							id="title"
							placeholder={`{{ file }}`}
						/>
						<p class="text-sm text-surface2">The title shown on the embed.</p>
					</div>
				</div>
				<div>
					<div class="flex flex-col gap-1">
						<label class="text-lg font-bold" for="description">Desciption</label>
						<textarea
							class="px-2 py-1 h-48 rounded-lg ring-1 transition-all bg-mantle ring-surface2 focus-visible:outline-none focus-visible:outline-overlay0"
							name="description"
							id="description"
							placeholder={`Uploaded by {{ username }} at {{ time }}`}
						></textarea>

						<p class="text-sm text-surface2">
							The description of the embed. Can have up to 2000 characters.
						</p>
					</div>
				</div>

				<div class="mb-1">
					<div class="flex flex-col gap-1">
						<label class="text-lg font-bold" for="color">Color</label>
						<input type="color" name="color" id="color" value="#{(3159110).toString(16)}" />
						<p class="text-sm text-surface2">The color shown to the left of the embed.</p>
					</div>
				</div>

				<Button color={'bg-mantle'} click={() => {}}>
					<p class="w-full text-center">Update Embeds</p></Button
				>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-2 p-2 max-w-lg rounded-lg bg-crust">
			<p class="text-xl font-bold">Security Settings</p>
			<span class="w-full border-b-2 border-surface0" />
			<div class="flex flex-col gap-3">
				<div class="">
					<div class="flex flex-col gap-1">
						<label class="text-lg font-bold" for="password">Password</label>
						<div class="flex flex-col gap-1.5">
							<input
								class="px-2 h-8 rounded-lg ring-1 transition-all bg-mantle ring-surface2 focus-visible:outline-none focus-visible:outline-overlay0"
								type="password"
								name="password"
								id="password"
								placeholder="Old Password"
							/>
							<input
								class="px-2 h-8 rounded-lg ring-1 transition-all bg-mantle ring-surface2 focus-visible:outline-none focus-visible:outline-overlay0"
								type="password"
								name="npassword"
								id="npassword"
								placeholder="New Password"
							/>
							<input
								class="px-2 h-8 rounded-lg ring-1 transition-all bg-mantle ring-surface2 focus-visible:outline-none focus-visible:outline-overlay0"
								type="password"
								name="cpassword"
								id="cpassword"
								placeholder="Confirm Password"
							/>
						</div>
						<Button color={'bg-mantle mt-1'} click={() => {}}>
							<p class="w-full text-center">Change Password</p></Button
						>
					</div>
				</div>

				<div>
					<div class="flex flex-col gap-0.5">
						<p class="text-lg font-bold">2FA</p>
						<p class="text-sm text-surface2">
							A One-Time Password will be required each time you login.
						</p>

						<Button color={'bg-mantle mt-2'} click={() => {}}>
							<p class="w-full text-center">Enable 2FA</p>
						</Button>
						<div></div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-2 p-2 max-w-lg rounded-lg bg-crust">
			<p class="text-xl font-bold">Privacy Settings</p>
			<span class="w-full border-b-2 border-surface0" />
			<div class="flex flex-col gap-3">
				<div class="">
					<div class="flex flex-col gap-0.5">
						<div>
							<input type="checkbox" name="newPostsPublic" id="newPostsPublic" />
							<label class="" for="newPostsPublic">New Posts Public</label>
						</div>
						<p class="text-sm text-surface2">
							Whether newly uploaded posts should be public or not.
						</p>
					</div>
				</div>
				<div class="">
					<div class="flex flex-col gap-0.5">
						<div>
							<input type="checkbox" name="encryptUploads" id="encryptUploads" />
							<label class="" for="encryptUploads">Encrypt Uploads</label>
						</div>
						<p class="text-sm text-surface2">Enable encryption for new uploads. (Client-side)</p>
					</div>
				</div>
				<Button color={'bg-mantle'} click={() => {}}>
					<p class="w-full text-center">Update Preferences</p></Button
				>
			</div>
		</div>
	</div>
</div>
