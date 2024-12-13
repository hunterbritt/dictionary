const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"


const search = document.getElementById('search');
const searchBtn = document.getElementById('search-icon');
const definition = document.getElementById('definition');
const example = document.getElementById('example');
const synonyms = document.getElementById('synonyms');

const searchWord = async (word) => {
    if (!window.ononline) {
        document.querySelector('.info').innerHTML = "No internet connection";
    }
    else {
        document.querySelector('.card').style.display = 'none';
    }
    const response = await fetch(API_URL + word);
    const data = await response.json();
    console.log(data);
    return data;
}



searchBtn.addEventListener("click", async () => {
    try {
        if (!search.value === '' || searchWord.status === 404) {
            const response_data = await searchWord(search.value)
            if (!response_data || response_data.length === 0) {
                alert("Word not found");
            }
            document.querySelector('.card').style.display = 'block';
            document.querySelector('.word').innerHTML = `Word: ${search.value}`;
            if (response_data[0].meanings.length > 1) {
                response_data[0].meanings.forEach((meaning) => {
                    document.querySelector('.definition').innerHTML = `(${meaning.partOfSpeech}): ${meaning.definitions[0].definition}`;
                })
            } else if (response_data[0].meanings.length === 1) {

                document.querySelector('.definition').innerHTML = `${response_data[0].meanings[0].definitions[0].definition}`;
            } else {
                document.querySelector('.info').innerHTML = `${response_data.title} - ${response_data.message}`
            }
            document.querySelector('.definition').classList.add('highlight');
            document.querySelector('.source').classList.add('highlight');

            search.value = "";
            if (response_data[0].meanings[0].antonyms.length > 0 || response_data[0].meanings[0].synonyms.length > 0) {

                document.querySelector('.synonyms').innerHTML = `Synonyms: [${response_data[0].meanings[0].synonyms},]`;
                document.querySelector('.antonyms').innerHTML = `Antonyms: [${response_data[0].meanings[0].antonyms},]`;
            } else {
                document.querySelector('.synonyms').innerHTML = `No Synonyms`;
                document.querySelector('.antonyms').innerHTML = `No Antonyms`;
            }
            document.querySelector('.source').innerHTML = `${response_data[0].sourceUrls}`
            document.querySelector('.source').href = response_data[0].sourceUrls[0];
        } else {
            document.querySelector('.info').style.display = 'block';
            document.querySelector('.info').innerHTML = "Please enter a word";
            setTimeout(() => {
                document.querySelector('.info').style.display = 'none';
            }, 3000);
        }

    } catch (error) {
        alert(`Error: ${error}`);
    }
})


search.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (search.value !== '') {
            const response_data = await searchWord(search.value);
            if (!response_data || response_data.length === 0) {
                alert("Word not found");
            }
            document.querySelector('.card').style.display = 'block';
            document.querySelector('.word').innerHTML = `Word: ${search.value}`;
            if (response_data[0].meanings.length > 1) {
                response_data[0].meanings.forEach((meaning) => {
                    document.querySelector('.definition').innerHTML = `(${meaning.partOfSpeech}): ${meaning.definitions[0].definition}`;
                })
            } else if (response_data[0].meanings.length > 1) {
                document.querySelector('.definition').innerHTML = `${response_data[0].meanings[0].definitions[0].definition}`;
            } else {
                document.querySelector('.info').innerHTML = `${response_data.title} - ${response_data.message}`
            }
            document.querySelector('.definition').classList.add('highlight');
            document.querySelector('.source').classList.add('highlight');

            search.value = "";
            if (response_data[0].meanings[0].antonyms.length > 0 || response_data[0].meanings[0].synonyms.length > 0) {
                document.querySelector('.synonyms').innerHTML = `Synonyms: [${response_data[0].meanings[0].synonyms},]`;
                document.querySelector('.antonyms').innerHTML = `Antonyms: [${response_data[0].meanings[0].antonyms},]`;
            } else {
                document.querySelector('.synonyms').innerHTML = `No Synonyms`;
                document.querySelector('.antonyms').innerHTML = `No Antonyms`;
            }
            document.querySelector('.source').innerHTML = `${response_data[0].sourceUrls}`;
            document.querySelector('.source').href = response_data[0].sourceUrls[0];
        }
    }
})