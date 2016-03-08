USE [C12]
GO
/****** Object:  StoredProcedure [dbo].[UserSections_GetBySectionId]    Script Date: 3/8/2016 11:27:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[UserSections_GetBySectionId]
	@SectionId int
AS
BEGIN
/*
EXEC [dbo].[UserSections_GetBySectionId] 2
*/

	SELECT usec.UserProfileId
				, usec.SectionId
				, uprof.FirstName
				, uprof.LastName
				, usec.EnrollmentStatusId
				, usec.Comment 
	FROM [dbo].[UserProfiles] uprof 
		JOIN [dbo].[UserSections] usec
			ON uprof.Id=usec.UserProfileId

	WHERE usec.SectionId=@SectionId

END
