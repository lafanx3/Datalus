USE [C12]
GO
/****** Object:  StoredProcedure [dbo].[UserSections_UpdateUser]    Script Date: 3/8/2016 11:31:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UserSections_UpdateUser]
	  @UserProfileId int
	, @SectionId int
	, @EnrollmentStatusId int
	, @IsForCredit bit
	, @Comment nvarchar(500)
AS
BEGIN
/*

EXEC [dbo].[UserSections_UpdateUser] 6, 2, 4, 0, 'testing update'

*/
	UPDATE [dbo].[UserSections] SET
		  EnrollmentStatusId = @EnrollmentStatusId
		, IsForCredit = @IsForCredit
		, Comment = @Comment
	WHERE
		UserProfileId = @UserProfileId
	AND 
		SectionId=@SectionId;

END
