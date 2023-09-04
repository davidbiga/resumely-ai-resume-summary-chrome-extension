import React, {
ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import {
Center, Stack, Textarea, Divider, Button, ScrollArea, Loader
} from '@mantine/core';
import { getStorageEntry, setStorageEntry } from '..';
import { Configuration, OpenAIApi } from "openai";
import { Clipboard } from 'tabler-icons-react';

export function AiContentPage() {
    const [results, setResults] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            error && setError(false);
            loading && setLoading(false);
            setJobDescription(event.target.value);
        },
        [],
    );
    const inputOnChangeHandlerResults = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            error && setError(false);
            loading && setLoading(false);
            setResults(event.target.value);
        },
        [],
    );

    useEffect(() => {
        const data = getStorageEntry('ai-summary');
        if (data) {
            setJobDescription(data.resume.content.job_description);
            setResults(data.resume.content.ai_generated_content);
        }
    }, [])

    const saveLocal = async () => {
        setLoading(true)
        let experience = getStorageEntry('resume-experience');
        if (!experience) {
            return;
        }
        const { resume } = experience;

        // call server
        const configuration = new Configuration({
            apiKey: `${process.env.OPENAI_SECRET_KEY}`,
        });

        delete configuration.baseOptions.headers['User-Agent'];
        const openai = new OpenAIApi(configuration);

        // moderate:
        const flagged = await openai.createModeration({
            input: jobDescription
        });
        if (flagged.data.results[0].flagged) {
            setResults('');
            setLoading(false);
            return false;
        }
        const flaggedResume = await openai.createModeration({
            input: resume.description
        });
        if (flaggedResume.data.results[0].flagged) {
            setResults('');
            setLoading(false);
            return false;
        }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
            {
                role: "system",
                content: `
You are helping me to write a first-person summary as to why I would be a good fit for a job position.  Use the provided resume and experience to formulate a 2 - 4 sentence summary as if you were me.

Resume & Experience: ${resume.description}
`,
            },
            {
                role: "user",
                content: jobDescription
            }
        ],
      });
      // @ts-ignore
      const aiContent = completion.data.choices[0].message.content;
      setResults(aiContent);
      setStorageEntry('ai-summary', { content: {job_description: jobDescription, ai_generated_content: aiContent }});
      setLoading(false);
    }

    const clipboardData = useCallback(async () => {
        const test = await navigator.clipboard.writeText(results);
        console.log(test);
    }, [results]);


    return (
    <>
        <Center
            sx={() => ({
                // height: '100%',
            })}
        >
            <Stack
                style={{
                    width: '100%',
                }}
            >
                <ScrollArea>
                    <p>Use this to build your automated responses on job applications.</p>
                    <Divider/>
                    <Textarea
                        disabled={loading}
                        placeholder='Job Description'
                        label="Copy and paste the job description from the position you are reviewing"
                        minRows={8}
                        value={jobDescription}
                        onChange={inputOnChangeHandler}
                    />
                    <p>Your AI Summary Content</p>
                    <Divider/>
                    <Textarea
                        disabled={loading}
                        placeholder='Your AI Built Summary'
                        label="Once you click generate, you'll see your copy & paste results here."
                        minRows={8}
                        value={results}
                        onChange={inputOnChangeHandlerResults}
                    />
                    <Button
                        onClick={clipboardData}
                        variant='subtle'
                        style={{margin: 10}}
                    >
                        Copy Summary&nbsp;<Clipboard width="20px" height="20px" />
                    </Button>
                    <br/>
                    <Button onClick={saveLocal}
                        disabled={loading}
                        style={{width: '100%'}}>
                        Generate AI Summary
                        { loading && (
                        <Loader size="md" />
                        )}
                    </Button>
                </ScrollArea>
            </Stack>
        </Center>
    </>
    )
}
