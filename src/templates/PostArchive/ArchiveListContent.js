import React, { useEffect, useRef } from 'react';
import Button from '../../components/Button';
import { CategoriesToString } from '../../utils/CategoryHelpers';
import { MakeRelativePath } from '../../utils/UrlUtils';
import { TruncateText } from '../../utils/TextHelpers';
import GlobalConstants from '../../GlobalConstants';


import gsap from 'gsap';

const ArchiveListContent = (props) => {
    const {
			nodes
		} = props;
		const listRef = useRef(null);
		const baseClass = `post-archive-list`;

		useEffect(() => {
			gsap.to(listRef.current, { duration: 0.25, opacity: 1, y: 0 });
		});

	return (
		<div className={baseClass} ref={listRef}>
			<div className={`${baseClass}__inner`}>
				{
					nodes.map((node, index) => {
						const {
							title,
							link,
							categories,
							featuredImage,
							excerpt
						} = node;

						let excerptTruncated = TruncateText(excerpt, GlobalConstants.resources.blogExcerptMaxCharLength);

						return (
							<div
								key={`post-${index}`}
								className={`${baseClass}__single-post`}
							>
								{featuredImage ?


									<div className={`${baseClass}__single-post__image`}>

										<img
											srcSet={featuredImage ? featuredImage.srcSet : ''}
											src={featuredImage ? featuredImage.mediaItemUrl : ''}
											alt={featuredImage ? featuredImage.altText : '' || featuredImage ?  featuredImage.title : '' }
											className={`img-responsive`}
										/>

									</div>
									: null}
									<div className={`${baseClass}__single-post__content`}>
										<div className={`${baseClass}__cat-container`}>
											<span className={`subhead`}>{ CategoriesToString(categories) }</span>
										</div>
										<h6
											dangerouslySetInnerHTML={{__html: title}}
											className={`${baseClass}__single-post__title h7`}
										/>
										<p dangerouslySetInnerHTML={{__html: excerptTruncated}} />
										<Button
											buttons={[{
												displayType: `both`,
												link: {
													target: ``,
													url: MakeRelativePath(link),
													title: `Learn More`
												},
												buttonType: `standard`
											}]}
											buttonAlignment={`left`}
										/>
								</div>
							</div>
						);
					})
				}
			</div>
		</div>
	)
};

export default ArchiveListContent;
