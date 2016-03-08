USE [C12]
GO
/****** Object:  StoredProcedure [dbo].[UserSections_EnrollmentCapacity]    Script Date: 3/8/2016 11:31:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[UserSections_EnrollmentCapacity]
	@SectionId int
AS
BEGIN
/*
EXEC [dbo].[UserSections_EnrollmentCapacity] 2
*/


/*Returns maximum capacity and total number of students enrolled or approved in a specific section*/
	SELECT DISTINCT
		s.Id
		, s.Title
		, s.Capacity
		, (SELECT SUM(Approved) AS Enrolled
				FROM(
						SELECT COUNT(*) AS Approved FROM dbo.UserSections WHERE EnrollmentStatusId=2 AND SectionId=@SectionId
							UNION ALL
						SELECT COUNT(*) FROM dbo.UserSections WHERE EnrollmentStatusId=4 and SectionId=@SectionId
					)x
			) AS TotalEnrolled
	FROM [dbo].[Sections] s
		JOIN [dbo].UserSections usec
			ON s.Id= usec.SectionId
				WHERE s.Id=@SectionId

END
