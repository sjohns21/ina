import Layout from '@/components/Layout';
import React from 'react';

type Props = {};

export default function Marketing({ }: Props) {
    return (
        <Layout title="Feedback Analyzer">
            <h1>Feedback Analyzer</h1>
            <h2>Analyze user feedback, understand your customers, improve your product</h2>
            <div className='flex justify-between'>
                <section className='w-1/4'>
                    <h3>Raw Feedback</h3>
                    <p>It would be nice if the documentation included search</p>
                    <p>Where is `Getting Started` in the documenation?</p>
                    <p>Haha</p>
                </section>
                <section className='w-1/4'>
                    <h3>Filtered Feedback</h3>
                    <p>It would be nice if the documentation included search</p>
                    <p>Where is `Getting Started` in the documenation?</p>
                </section>
                <section className='w-1/4'>
                    <h3>Identified Problems</h3>
                    <p>The documentation is hard to navigate</p>
                </section>
                <section className='w-1/4'>
                    <h3>Product Suggestions</h3>
                    <p>Add search and navigation to the documentation</p>
                </section>
            </div>
            <style jsx>{`
                .feedback-container {
                        border: 1px solid #ddd;
                    padding: 1rem;
                    margin-bottom: 1rem;
                }

                    .feedback-container p {
                        font - size: 0.8rem;
                    margin: 0; 
                }`}
            </style>
        </Layout>
    );
}

