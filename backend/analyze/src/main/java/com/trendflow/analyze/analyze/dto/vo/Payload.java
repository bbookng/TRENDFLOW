package com.trendflow.analyze.analyze.dto.vo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Payload {
	@JsonProperty("comment_df")
	private List<Comment> commentDf;
	@JsonProperty("cnt_df")
	private List<AnalyzeResult> cntDf;
	@JsonProperty("video_info")
	private VideoInfo videoInfo;

	public Payload(List<Comment> commentDf, List<AnalyzeResult> cntDf, VideoInfo videoInfo) {
		this.commentDf = commentDf;
		this.cntDf = cntDf;
		this.videoInfo = videoInfo;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class Comment {
		private String id;
		private String comments;
		private int likes;
		private int dislikes;
		private double sentiment;
		private int label;

		public Comment(@JsonProperty("id") String id,
			@JsonProperty("comments") String comments,
			@JsonProperty("likes") int likes,
			@JsonProperty("dislikes") int dislikes,
			@JsonProperty("sentiment") double sentiment,
			@JsonProperty("label") int label) {
			this.id = id;
			this.comments = comments;
			this.likes = likes;
			this.dislikes = dislikes;
			this.sentiment = sentiment;
			this.label = label;
		}
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class AnalyzeResult {
		private int label;
		private int count;
		private double ratio;

		public AnalyzeResult(@JsonProperty("label") int label,
			@JsonProperty("count") int count,
			@JsonProperty("ratio") double ratio) {
			this.label = label;
			this.count = count;
			this.ratio = ratio;
		}
	}

	@Getter
	@Setter
	@NoArgsConstructor
	public static class VideoInfo {
		private String channelTitle;
		private String commentCount;
		private String likeCount;
		private String subscriberCount;
		private String title;
		private String viewCount;


		public VideoInfo(@JsonProperty("channelTitle") String channelTitle,
			@JsonProperty("commentCount") String commentCount,
			@JsonProperty("likeCount") String likeCount,
			@JsonProperty("subscriberCount") String subscriberCount,
			@JsonProperty("title") String title,
			@JsonProperty("viewCount") String viewCount) {
			this.channelTitle = channelTitle;
			this.commentCount = commentCount;
			this.likeCount = likeCount;
			this.subscriberCount = subscriberCount;
			this.title = title;
			this.viewCount = viewCount;
		}
	}
}