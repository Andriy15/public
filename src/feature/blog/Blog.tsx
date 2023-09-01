import React, { useId, useState } from 'react'
import { IBlog } from './Blog.model'
import { CommentForm } from '../comments/Comment.form'
import { CommentList } from '../comments/Comment.list'
import { useComment } from '../comments/hooks/comments.hook'
import { useRole } from '../auth/sign-up/context/Role.context'

interface BlogProps {
	blog: IBlog
	onDropdownOpen: () => void
}

export function Blog({ blog, onDropdownOpen }: BlogProps) {
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const { comments } = useComment()

	const { role } = useRole()

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen)
		onDropdownOpen()
	}

	console.log(comments)

	return (
		<div className='bg-white rounded-lg shadow-md p-4 my-4'>
			<img
				src={blog.urlToImage}
				alt={blog.title}
				className='w-full h-auto rounded-lg mb-2'
			/>
			<h2 className='text-xl font-semibold mb-2'>{blog.title}</h2>
			<p className='text-gray-600 mb-2'>{blog.description}</p>
			<p className='text-gray-700 font-medium mb-1'>Author: {blog.author}</p>
			<p className='text-gray-700 mb-1'>Source: {blog.source.name}</p>
			<p className='text-gray-700 mb-2'>Published at: {blog.publishedAt}</p>
			<a
				href={blog.url}
				target='_blank'
				rel='noopener noreferrer'
				className='text-blue-500 hover:underline mr-4'
			>
				Read more
			</a>
			<button
				className='hover:bg-blue-200 text-gray-500 font-bold py-2 px-4 rounded'
				onClick={toggleDropdown}
			>
				Comment
			</button>
			{dropdownOpen && comments.length === 0 ? (
				<>
					<p className='text-gray-600'>No comments yet</p>
					{role === 'commentator' && <CommentForm />}
				</>
			) : (
				<CommentList />
			)}
		</div>
	)
}
