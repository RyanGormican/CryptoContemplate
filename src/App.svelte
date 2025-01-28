<script>
  import { onMount } from 'svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Feedback from './Feedback/Feedback.svelte';  // Import the Feedback component

  let assets = [];
  let isLoading = true;
  let error = null;
  let isModalOpen = false; // State to control modal visibility

  const toggleFeedbackModal = () => {
  isModalOpen = !isModalOpen; // Toggle the modal state
  };

  onMount(async () => {
  try {
  const response = await fetch('https://api.coincap.io/v2/assets');
  const data = await response.json();
  assets = data.data; // Store the fetched assets
  } catch (err) {
  error = 'Failed to fetch data';
  } finally {
  isLoading = false;
  }
  });
</script>

<main>
  <div class="container">
    <h1 class="mt-5">CryptoContemplate</h1>

    <span class="links">
      <a href="https://www.linkedin.com/in/ryangormican/">
        <span style="color: #0e76a8;" class="mdi--linkedin"></span>
      </a>
      <a href="https://github.com/RyanGormican/CryptoContemplate">
        <span style="color: #e8eaea;" class="mdi--github"></span>
      </a>
      <a href="https://ryangormicanportfoliohub.vercel.app/">
        <span style="color: #199c35;" class="teenyicons--computer-outline"></span>
      </a>
      <div class="cursor-pointer" on:click={"toggleFeedbackModal"}>
        <!-- Use toggle function -->
        <span class="material-symbols--feedback"></span>
      </div>
    </span>

    {#if isLoading}
    <p>Loading...</p>
    {:else if error}
    <p>{error}</p>
    {:else}
    <table class="table table-striped table-bordered mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price (USD)</th>
          <th>Supply</th>
          <th>Max Supply</th>
          <th>Market Cap (USD)</th>
          <th>Volume (24h USD)</th>
          <th>Change (24h %)</th>
          <th>VWAP (24h USD)</th>
        </tr>
      </thead>
      <tbody>
        {#each assets as asset (asset.id)}
        <tr>
          <td>{asset.name}</td>
          <td>{asset.symbol}</td>
          <td class={"parseFloat(asset.changePercent24Hr"
            < 0 ? 'text-danger' : 'text-success'}>
                ${parseFloat(asset.priceUsd).toFixed(2)}
          </td>
          <td>{parseFloat(asset.supply).toLocaleString()}</td>
          <td>{asset.maxSupply ? parseFloat(asset.maxSupply).toLocaleString() : 'N/A'}</td>
          <td>{parseFloat(asset.marketCapUsd).toLocaleString()}</td>
          <td>{parseFloat(asset.volumeUsd24Hr).toLocaleString()}</td>
          <td>{parseFloat(asset.changePercent24Hr).toFixed(2)}%</td>
          <td>${parseFloat(asset.vwap24Hr).toFixed(2)}</td>
        </tr>
        {/each}
      </tbody>
    </table>
    {/if}
  </div>

  <!-- Include the Feedback Modal component -->
  <Feedback {isModalOpen} setIsModalOpen={"toggleFeedbackModal"} />
</main>

<style>
  .container {
  max-width: 1200px;
  margin: 0 auto;
  }

  .text-success {
  color: green;
  }

  .text-danger {
  color: red;
  }
</style>
