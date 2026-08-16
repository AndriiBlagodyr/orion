import React, {useState, useEffect, useCallback} from 'react';

// Mock URLs for demonstration
const sidebarUrl = 'https://api.example.com/sidebar';
const issueUrl = 'https://api.example.com/issue';
const commentsUrl = 'https://api.example.com/comments';

const Component1 = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Define the fetch function inside useEffect
        const fetchData = async () => {
            try {
                const response = await fetch('https://run.mocky.io/v3/b3bcb9d2-d8e9-43c5-bfb7-0062c85be6f9');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Помилка при завантаженні даних:', error);
            }
        };

        fetchData();
    }, []); // Clean empty dependency array, no linter warnings!

    return <>...</>;
};

const PostComponent = () => {
    const [loading, setLoading] = useState(false);

    const sendData = async () => {
        setLoading(true);

        // Наш Payload (дані, які відправляємо)
        const payload = {
            title: 'Новий пост',
            body: 'Текст нашого повідомлення',
            userId: 1,
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST', // Вказуємо метод
                headers: {
                    'Content-Type': 'application/json', // Кажемо серверу, що шлемо JSON
                },
                body: JSON.stringify(payload), // Перетворюємо об'єкт у рядок

            });

            if (!response.ok) {
                throw new Error('Помилка мережі');
            }

            const result = await response.json();
            console.log('Успіх:', result);
            alert('Дані відправлено!');
        } catch (error) {
            console.error('Помилка:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={sendData} disabled={loading}>
            {loading ? 'Відправка...' : 'Відправити дані'}
        </button>
    );
};

const Component2 = () => {
    const [data, setData] = useState();

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (await fetch('https://run.mocky.io/v3/b3bcb9d2-d8e9-43c5-bfb7-0062c85be6f9')).json();

            // set state when the data received
            setData(data);
        };

        dataFetch();
    }, []);

    return <>...</>;
};

// In Parallel without Promise all example
const useParallelData = () => {
    const [sidebar, setSidebar] = useState();
    const [comments, setComments] = useState();
    const [issue, setIssue] = useState();

    useEffect(() => {
        const dataFetch = async () => {
            try {
                // Start all requests first. Nothing is awaited yet, so they run in parallel.
                const sidebarPromise = fetch(sidebarUrl).then(response => {
                    if (!response.ok) throw new Error('Sidebar fetch failed');
                    return response.json();
                });
                const issuePromise = fetch(issueUrl).then(response => {
                    if (!response.ok) throw new Error('Issue fetch failed');
                    return response.json();
                });
                const commentsPromise = fetch(commentsUrl).then(response => {
                    if (!response.ok) throw new Error('Comments fetch failed');
                    return response.json();
                });

                // Awaiting them one by one here does not make the requests waterfall,
                // because all requests were already started above.
                const sidebarResult = await sidebarPromise;
                const issueResult = await issuePromise;
                const commentsResult = await commentsPromise;

                setSidebar(sidebarResult);
                setIssue(issueResult);
                setComments(commentsResult);
            } catch (error) {
                console.error('Error fetching parallel data:', error);
            }
        };

        dataFetch();
    }, []);

    return {sidebar, comments, issue};
};


// Promise ALL example
const useAllData = () => {
    const [sidebar, setSidebar] = useState();
    const [comments, setComments] = useState();
    const [issue, setIssue] = useState();

    useEffect(() => {
        const dataFetch = async () => {
            try {
                // Fetch all data in parallel
                const responses = await Promise.all([
                    fetch(sidebarUrl),
                    fetch(issueUrl),
                    fetch(commentsUrl)
                ]);

                // Check if any request failed
                for (const response of responses) {
                    if (!response.ok) throw new Error('Fetch failed');
                }

                // Parse all responses in parallel
                const [sidebarResult, issueResult, commentsResult] = await Promise.all(
                    responses.map(r => r.json())
                );

                setSidebar(sidebarResult);
                setIssue(issueResult);
                setComments(commentsResult);
            } catch (error) {
                console.error('Error fetching all data:', error);
            }
        };

        dataFetch();
    }, []);

    return {sidebar, comments, issue};
};
