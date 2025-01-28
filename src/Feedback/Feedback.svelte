<script>
  import { firestore2 } from './firebaseConfig';
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

  export let isModalOpen = false;
  export let toggleFeedbackModal = () => {};  

  let name = 'Anonymous';
  let suggestion = '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore2, 'suggestions'), {
        name: name.trim(),
        topic: 'CryptoContemplate',
        suggestion: suggestion.trim(),
        timestamp: serverTimestamp(),
        status: 'incomplete',
      });
      name = 'Anonymous';
      suggestion = '';
    } catch (error) {
      console.error('Error adding suggestion: ', error);
    }
  };

  const handleProjectClick = async () => {
    try {
      await addDoc(collection(firestore2, 'feedback'), {
        project: 'UserUnit',
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const closeModal = () => {
    toggleFeedbackModal(); 
  };
</script>

<style>
  .modal {
    display: block;
    position: fixed;
    z-index: 15;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 60px;
    color: #333;
  }

  .modal-content {
    background-color: #fff;
    margin: 5% auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .form-control:focus {
    border-color: blue;
    outline: none;
  }

  textarea {
    height: 100px;
    resize: none;
  }

  .submit-button {
    background-color: lightblue;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-button:hover {
    background-color: darkblue;
  }

  .improvement-button {
    background-color: lightblue;
    border: none;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .improvement-button:hover {
    background-color: lightblue;
  }
</style>

<div class={`modal ${isModalOpen ? 'show' : ''}`} on:click={closeModal}>
  <div class="modal-dialog" on:click|stopPropagation>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Feedback</h5>
        <button type="button" class="close" on:click={closeModal}>
          &times;
        </button>
      </div>
      <div class="modal-body">
        <button class="improvement-button" on:click={handleProjectClick}>
          Signal for Improvement
        </button>
        <h2>Leave a Suggestion</h2>
        <form on:submit={handleSubmit}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              bind:value={name}
              placeholder="Your name (optional)"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="suggestion">Suggestion</label>
            <textarea
              id="suggestion"
              name="suggestion"
              bind:value={suggestion}
              placeholder="Your suggestion"
              required
              class="form-control"
            />
          </div>
          <button type="submit" class="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
