USE [C12]
GO
/****** Object:  StoredProcedure [dbo].[UserSections_GetByUserProfileId]    Script Date: 3/8/2016 11:12:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[UserSections_GetByUserProfileId]
	@UserProfileId int
AS
BEGIN
/*
EXEC [dbo].[UserSections_GetByUserProfileId] 79
*/

/*get stuff from usersections table*/
SELECT usec.UserProfileId
			, usec.SectionId
			, s.SectionNumberId
			, s.Title
			, usec.EnrollmentStatusId
			, usec.IsForCredit
			, usec.Comment
FROM dbo.UserSections usec 
	JOIN dbo.Sections s
		ON s.id= usec.SectionId
WHERE usec.UserProfileId=@UserProfileId


END
