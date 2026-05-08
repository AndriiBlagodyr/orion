import React, {useState, useEffect, useCallback} from 'react';

const Component1 = () => {
    const [data, setData] = useState(null);

    // Виносимо логіку в useCallback
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('https://run.mocky.io/v3/b3bcb9d2-d8e9-43c5-bfb7-0062c85be6f9');
            const jsonData = await response.json();

            setData(jsonData);
        } catch (error) {
            console.error('Помилка при завантаженні даних:', error);
        }
    }, []); // Порожній масив залежностей означає, що функція створиться лише один раз

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Тепер ми можемо безпечно додати fetchData в залежності

    // useEffect(() => {
    //     fetchData();
    // }, []); // Помилка лінтера (exhaustive-deps)

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
            // Start all requests first. Nothing is awaited yet, so they run in parallel.
            const sidebarPromise = fetch(sidebarUrl).then(response => response.json());
            const issuePromise = fetch(issueUrl).then(response => response.json());
            const commentsPromise = fetch(commentsUrl).then(response => response.json());

            // Awaiting them one by one here does not make the requests waterfall,
            // because all requests were already started above.
            const sidebarResult = await sidebarPromise;
            const issueResult = await issuePromise;
            const commentsResult = await commentsPromise;

            setSidebar(sidebarResult);
            setIssue(issueResult);
            setComments(commentsResult);
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
            // waiting for allthethings in parallel
            const result = (await Promise.all([fetch(sidebarUrl), fetch(issueUrl), fetch(commentsUrl)])).map(r =>
                r.json(),
            );
            // and waiting a bit more - fetch API is cumbersome
            const [sidebarResult, issueResult, commentsResult] = await Promise.all(result);
            // when the data is ready, save it to state
            setSidebar(sidebarResult);
            setIssue(issueResult);
            setComments(commentsResult);
        };
        dataFetch();
    }, []);
    return {sidebar, comments, issue};
};
