USE [C12]
GO
/****** Object:  StoredProcedure [dbo].[UserSections_SelectSpecificUser]    Script Date: 3/8/2016 11:29:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[UserSections_SelectSpecificUser]
	@UserProfileId int,
	@SectionId int
AS
BEGIN
/*
	EXEC [dbo].[UserSections_SelectSpecificUser] 6, 1
*/

	SELECT * 
	FROM UserSections
	WHERE UserProfileId=@UserProfileId
	AND SectionId=@SectionId;


END
