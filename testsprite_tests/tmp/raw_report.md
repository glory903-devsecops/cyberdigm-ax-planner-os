
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** cmtx-ax-planner-os
- **Date:** 2026-04-28
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Enable admin mode with valid local key
- **Test Code:** [TC001_Enable_admin_mode_with_valid_local_key.py](./TC001_Enable_admin_mode_with_valid_local_key.py)
- **Test Error:** TEST BLOCKED

The admin authentication step cannot be completed because a valid local admin access key was not provided.

Observations:
- The page contains the '관리자' label but the admin access dialog was not opened (only scrolling occurred).
- No admin access key or credentials were supplied in the task or extra info, so authentication cannot be performed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/4b6ab5bb-fd04-4e28-83c5-c627af52af0e
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Admin status remains consistent across core routes
- **Test Code:** [TC002_Admin_status_remains_consistent_across_core_routes.py](./TC002_Admin_status_remains_consistent_across_core_routes.py)
- **Test Error:** TEST BLOCKED

The admin login control could not be found on the dashboard, so the admin authentication flow could not be executed.

Observations:
- The GR Hub page loaded and shows dashboard content, but there is no visible '관리자 로그인' or admin access control in the header or sidebar.
- I scrolled the page to reveal the sidebar/navigation area and inspected interactive elements, but did not find an admin/login control.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/f5815a2f-04b0-4d3b-9a38-cadbeecb3972
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Create crawling target as admin and see it after page reload
- **Test Code:** [TC003_Create_crawling_target_as_admin_and_see_it_after_page_reload.py](./TC003_Create_crawling_target_as_admin_and_see_it_after_page_reload.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/0cff2c16-0d49-424f-b24f-0ad560bd3c81
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Create a new AX project plan and see it listed
- **Test Code:** [TC004_Create_a_new_AX_project_plan_and_see_it_listed.py](./TC004_Create_a_new_AX_project_plan_and_see_it_listed.py)
- **Test Error:** TEST FAILURE

Creating a new AX project plan did not work — the plan creation form did not appear after using the visible creation control.

Observations:
- The AX Planning page shows a '전략 로드맵 자동 생성' button, but clicking it did not open any plan creation form or input fields.
- No title or details input fields, no success confirmation, and no new plan entry appeared anywhere on the page after clicking.
- The button was clicked multiple times and the page was scrolled, but the UI did not change to reveal a creation modal.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/ebae99e6-c9d1-4644-aa25-a61a753f8c7c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Open GR Hub detail panel to view source link and AI summary
- **Test Code:** [TC005_Open_GR_Hub_detail_panel_to_view_source_link_and_AI_summary.py](./TC005_Open_GR_Hub_detail_panel_to_view_source_link_and_AI_summary.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/459270df-413c-410b-abad-429ed8f35366
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Create crawling target as guest and see simulation notice
- **Test Code:** [TC006_Create_crawling_target_as_guest_and_see_simulation_notice.py](./TC006_Create_crawling_target_as_guest_and_see_simulation_notice.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/e0af41cf-1b42-4604-9087-2cb5d3bc78d8
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Open an existing AX plan and return to the planning dashboard
- **Test Code:** [TC007_Open_an_existing_AX_plan_and_return_to_the_planning_dashboard.py](./TC007_Open_an_existing_AX_plan_and_return_to_the_planning_dashboard.py)
- **Test Error:** TEST FAILURE

Clicking the plan creation control did not open the plan-creation form, and no plan list is available to open a plan.

Observations:
- The '전략 로드맵 자동 생성' button is present but clicking it (tried twice) did not display any modal, form fields, or save controls.
- The AX Planning page does not show an existing plans list or any plan items to open.
- Repeated clicks produced no visible UI change, so the flow to create/open a plan cannot be completed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/f34b08c4-4ea3-477f-ade9-ae12013709b8
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Guest target is not persisted after reload
- **Test Code:** [TC008_Guest_target_is_not_persisted_after_reload.py](./TC008_Guest_target_is_not_persisted_after_reload.py)
- **Test Error:** TEST FAILURE

The Automation Center does not provide controls to register a guest crawling target, so the test cannot create or verify a guest-mode target.

Observations:
- No 'New target' / '대상 등록' / '새 대상' controls were found on the Automation Center page after scrolling.
- The visible UI only shows synchronization buttons and real-time job/status panels (e.g., '동기화', '일괄 크롤링 시작').
- The page end was reached and there is no registration form or add-button present.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/2f45ca4a-cb14-4c81-aa72-d8c178744ea4
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Close GR Hub detail panel and return to list
- **Test Code:** [TC009_Close_GR_Hub_detail_panel_and_return_to_list.py](./TC009_Close_GR_Hub_detail_panel_and_return_to_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/7bec58f2-c8cd-466a-9474-b7c567e0a25b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Sequentially inspect multiple GR Hub items without stale panel content
- **Test Code:** [TC010_Sequentially_inspect_multiple_GR_Hub_items_without_stale_panel_content.py](./TC010_Sequentially_inspect_multiple_GR_Hub_items_without_stale_panel_content.py)
- **Test Error:** TEST FAILURE

The detail panel updates when selecting different items, but the newly-displayed panel does not include the required original source link or an AI-generated summary as expected.

Observations:
- Clicking a different list item successfully updated the detail panel to the new item's content.
- The visible detail panel content did not contain original-source indicators (no '원본', '출처', '원문' labels or distinct external anchor link for the item).
- No AI-generated summary labels or summary text (e.g., 'AI 요약', '요약', '요약문') were found in the visible detail panel.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/6c296f1e-9121-4a1c-9e3c-f9971cf2553d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Prevent saving a plan when required fields are empty
- **Test Code:** [TC011_Prevent_saving_a_plan_when_required_fields_are_empty.py](./TC011_Prevent_saving_a_plan_when_required_fields_are_empty.py)
- **Test Error:** TEST BLOCKED

The plan creation form could not be opened, so the validation behavior could not be tested.

Observations:
- The '전략 로드맵 자동 생성' button (index 1102) was clicked twice but no modal or creation form appeared.
- Scrolling the AX planning page did not reveal any plan title input or save controls.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/0150a1ae-efd4-4b00-9239-714281b2a895
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Validate missing URL on crawling target registration
- **Test Code:** [TC012_Validate_missing_URL_on_crawling_target_registration.py](./TC012_Validate_missing_URL_on_crawling_target_registration.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/1fded19a-20fe-439e-a862-0134b88c1e4a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Discard plan creation and return to dashboard without saving
- **Test Code:** [TC013_Discard_plan_creation_and_return_to_dashboard_without_saving.py](./TC013_Discard_plan_creation_and_return_to_dashboard_without_saving.py)
- **Test Error:** TEST FAILURE

Clicking the '전략 로드맵 자동 생성' button did not open the new-plan creation UI, so I could not create or cancel a plan.

Observations:
- The page did not show any plan creation modal or a plan title input after clicking the start control.
- Repeated clicks and extensive scrolling did not reveal the form or any cancel/close control.
- The AX planning page remained visible with its existing content but no new-plan UI elements appeared.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/4468058e-77f9-42db-a748-341826e4fbb4
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Reject invalid or empty admin key
- **Test Code:** [TC014_Reject_invalid_or_empty_admin_key.py](./TC014_Reject_invalid_or_empty_admin_key.py)
- **Test Error:** TEST BLOCKED

The admin login feature could not be reached — the admin control or access-key input is not accessible from the GR Hub page.

Observations:
- The page contains the text '관리자' but no clickable admin login control or access-key input field was visible in the interactive elements.
- Repeated scrolling and searching for the admin control did not reveal any input or button to open an admin authentication dialog.
- After inspecting the visible interactive elements and page areas, there is no accessible admin authentication UI to submit a key.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/b1aa3116-4cb1-4e44-a386-446e89333aa7
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Handle long plan title and details without breaking save flow
- **Test Code:** [TC015_Handle_long_plan_title_and_details_without_breaking_save_flow.py](./TC015_Handle_long_plan_title_and_details_without_breaking_save_flow.py)
- **Test Error:** TEST BLOCKED

The plan creation form could not be reached — clicking the available '전략 로드맵 자동 생성' button did not open a creation form and no title or details fields are present on the page.

Observations:
- The AX Planning page shows an automatic generation button ('전략 로드맵 자동 생성') but clicking it did not reveal a plan creation form.
- Searches for creation field labels like '제목' and '계획' returned no results on the page.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f2cb5dc8-d5e4-49da-881a-0f79aa1c7965/a7a04982-fb54-41d8-aeb1-89556c90c131
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **33.33** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---