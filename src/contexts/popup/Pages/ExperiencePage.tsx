import React, {
ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import {
Center, Stack, Textarea, Divider, Button, ScrollArea
} from '@mantine/core';
import { useNavigate } from 'react-router';
import { getStorageEntry, setStorageEntry } from '..';

export type Result = {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
};

export function ExperiencePage() {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            error && setError(false);
            loading && setLoading(false);
            setValue(event.target.value);
        },
        [],
    );

    const navigate = useNavigate();

    useEffect(() => {
        const data = getStorageEntry('resume-experience');
        if (data) {
            setValue(data.resume.description);
        }
    }, [])

    const saveLocal = () => {
        setStorageEntry('resume-experience', {description: value});
        navigate(`/content`);
    }

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
                {/* { error && (
                    <Paper
                        shadow="xl"
                        radius="md"
                        style={{
                            // marginBottom: '150px',
                        }}
                    >
                        <Center>
                            <Text
                                style={{
                                textAlign: 'center',
                                padding: '10px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                Sorry, we couldn't find any results matching your search.
                                Please try again.
                            </Text>
                        </Center>
                    </Paper>
                )} */}
                <ScrollArea>
                    <p>Paste your resume below first.  Then head to the AI Content tab and generate your summary for copy & pasting while applying for positions.</p>
                    <Divider/>
                    <Textarea
                        placeholder='Paste your resume here'
                        label="Your resume & experience go here."
                        minRows={8}
                        value={value}
                        onChange={inputOnChangeHandler}
                    />
                    <br/>
                    <Button onClick={saveLocal}>
                        Save Locally
                    </Button>
                </ScrollArea>
            </Stack>
        </Center>
    </>
    )
}
