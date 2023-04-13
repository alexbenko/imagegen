import { useState } from "react";
import styles from '@/styles/gen.module.css'
import { SP } from "next/dist/shared/lib/utils";

export default function ImageGeneration(){
  function Spinner(){
    return (
      <div style={{'margin': '0 auto'}}>
        <div className={styles.spinner}></div>
        <div>Generating Images ...</div>
      </div>
    )
  }

  function simplifyText(input: string): string {
    // Define a list of filler words to remove
    const fillerWords = [
      'a', 'an', 'the', 'and', 'in', 'on', 'at', 'of', 'for', 'with', 'about', 'as', 'by',
      'to', 'from', 'up', 'down', 'over', 'under', 'again', 'further', 'then', 'once'
    ];

    // Remove unnecessary punctuation and extra spaces
    const cleanedInput = input
      .replace(/['"`“”‘’]+/g, '')
      .replace(/[.,?!;:]+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Split the cleaned input into words
    const words = cleanedInput.split(' ');

    // Remove filler words
    const filteredWords = words.filter(word => !fillerWords.includes(word.toLowerCase()));

    // Join the filtered words back into a single string
    const simplifiedText = filteredWords.join(' ');
    return simplifiedText;
  }

  async function handleSubmit(event: any){
    event.preventDefault();
    setRequestInProgress(true)
    const res = await fetch("/api/gen", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: simplifyText(text)
      }),
    });
    const data = await res.json()

    setImages(data.links);
    setRequestInProgress(false);
  }
  const [images, setImages] = useState<{'url': string}[]>([]);
  const [text, setText] = useState('');
  const [requestInProgress, setRequestInProgress] = useState(false);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles.textareaWrapper}>
        <label htmlFor="text" className={styles.textareaLabel}>
          Enter Prompt:
        </label>
        <textarea
          id="text"
          name="text"
          maxLength={200}
          value={text}
          onChange={handleChange}
          rows={4}
          cols={50}
          className={styles.textareaInput}
          disabled={requestInProgress}
        />
        {<button type="submit" className={styles.submitButton} disabled={requestInProgress}>
          Submit
        </button>}


      </form>
      {requestInProgress && <Spinner />}
      <div className={styles.imagesContainer}>
        {images && images.map((image, index) => (
          <a  key={index} href={image.url} target="_blank" rel="noreferrer">
            <img src={image.url} alt={`Generated Image ${index + 1}`} className={styles.image} />
          </a>

        ))}
      </div>
    </div>
  )
}