import React, {useState, useEffect} from "react"
import axios from 'axios'

const Search = () => {

    /** term to search*/
    const [term, setTerm] = useState('programming')

    /*result we get from the Wikipedia API*/
    const [results, setResults] = useState([])

    useEffect(() => {

        /*Wikipedia API request*/
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                }
            })

            /*Called every time we type something on the edit box**/
            setResults(data.query.search)
        }

        /* Check if we are on the first render, when the page loads for the first time**/
        if (term && !results.length) {
            search()
        } else {
            /* Timeout to wait .5 secs after the uses stops typing in order to make the API request happen less often**/
            const timeoutId = setTimeout(() => {

                /*If term is empty, this avoid the API response being an error**/
                if (term) {
                    search()
                }
            }, 500)

            /*This return function inside the useEffect hook is called when [term] is changed. So it is ignored on the
            first render but called on the re-render**/
            return () => {
                clearTimeout(timeoutId)
            }
        }
        /*Call it when it renders for the first time and when term changes**/
    }, [term])

    /**Map each of the results*/
    const renderedResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}>

                    </span>

                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input
                        className="input"
                        value={term}
                        onChange={e => setTerm(e.target.value)}/>
                </div>
            </div>

            <div className="ui celled list">]
                {renderedResults}
            </div>

        </div>
    )
}

export default Search