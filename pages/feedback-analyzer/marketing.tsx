import Layout from '@/components/Layout';
import React, { useState } from 'react';
import ArrowIcon from '@mui/icons-material/ArrowCircleRight';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BugReportIcon from '@mui/icons-material/BugReport';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import { FormControl, Button, TextField } from '@mui/material';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

type Props = {};
export default function Marketing({ }: Props) {
    const [email, setEmail] = useState('');
    const supabase = useSupabaseClient();
    return (
        <Layout title="Feedback Analyzer">
            <div className='flex mb-4'>
                <div className='w-1/2'>
                    <h1>Feedback Analyzer</h1>
                    <h2>Analyze user feedback, understand your customers, improve your product</h2>
                </div>
                <img src='https://media.sproutsocial.com/uploads/2023/01/Social-listening.jpg' alt='social listening' className='w-1/2 rounded' />
            </div>
            <div className='flex justify-between'>
                <section className='w-1/4'>
                    <RecordVoiceOverIcon className='w-full' />
                    <h3 className='text-center'>Raw Feedback</h3>
                    <p>`It would be nice if the documentation included search`</p>
                    <p>`Where is `Getting Started` in the documenation?`</p>
                    <p>`Haha`</p>
                </section>
                <ArrowIcon className='m-2 mt-5' />
                <section className='w-1/4'>
                    <FilterAltIcon className='w-full' />
                    <h3 className='text-center'>Filtered Feedback</h3>
                    <p>`It would be nice if the documentation included search`</p>
                    <p>`Where is `Getting Started` in the documenation?`</p>

                </section>
                <ArrowIcon className='m-2 mt-5' />
                <section className='w-1/4'>
                    <BugReportIcon className='w-full' />
                    <h3 className='text-center'>Identified Problems</h3>
                    <p>The documentation is hard to navigate</p>
                </section>
                <ArrowIcon className='m-2 mt-5' />
                <section className='w-1/4'>
                    <FeaturedVideoIcon className='w-full' />
                    <h3 className='text-center'>Product Suggestions</h3>
                    <p>Add search and navigation to the documentation</p>
                </section>
            </div>
            <div className='flex justify-center'>
                <FormControl className='w-1/2'>
                    <TextField
                        id='email'
                        label='Email address'
                        variant='outlined'
                        style={{ backgroundColor: 'gray' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant='contained' color='primary' onClick={async () => {
                        const { data, error } = await supabase
                            .from('sign_up')
                            .insert([
                                { email, page: 'feedback-analytics/marketing' },
                            ]);
                        (window as any).gtag('event', 'feedback_sign_up');
                    }}>
                        Sign up for early access
                    </Button>
                </FormControl>
            </div>
        </Layout >
    );
}
