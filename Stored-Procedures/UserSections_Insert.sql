USE [C12]
GO
/****** Object:  StoredProcedure [dbo].[UserSections_Insert]    Script Date: 3/8/2016 11:10:06 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UserSections_Insert]
	  @UserProfileId int 
	, @SectionId int
	, @EnrollmentStatusId int
	, @IsForCredit bit
	, @Comment nvarchar(500)
	, @UserId nvarchar(128)
AS
BEGIN
/**/
INSERT INTO [dbo].[UserSections](
		  UserProfileId
		, SectionId
		, EnrollmentStatusId
		, IsForCredit
		, Comment
		, UserId
		) 
	VALUES(
		  @UserProfileId
		, @SectionId
		, @EnrollmentStatusId
		, @IsForCredit
		, @Comment
		, @UserId
		);

END
